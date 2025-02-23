import { OpenAI } from 'openai';
import axios from 'axios';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const REPLIERS_API_URL = process.env.REPLIERS_API_URL;
const REPLIERS_API_KEY = process.env.REPLIERS_API_KEY;

// Dynamic mock data generation
const createMockProperties = (location: string) => [{
  id: '1',
  address: `123 Main St, ${location || 'Unknown Location'}`,
  price: 599999,
  bedrooms: 3,
  bathrooms: 2,
  sqft: 2000,
  images: ['/api/placeholder/800/600'],
  propertyType: 'House',
  yearBuilt: 2010,
  latitude: 43.6532,
  longitude: -79.3832
}];

async function extractQueryInfo(query: string) {
  const prompt = `
    Extract the following structured information from the real estate query:
    - "location": The city or area the user is interested in.
    - "price_min": The minimum price (numeric value).
    - "price_max": The maximum price (numeric value).
    - "beds_min": The minimum number of bedrooms (numeric value).
    - "baths_min": The minimum number of bathrooms (numeric value).
    - "propertyType": The type of property (Detached, Semi-Detached, Townhouse, Condo).
    
    If any field is not explicitly mentioned in the query, set its value to null.
    Query: "${query}"
    Return the output as a JSON object.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You extract structured data from real estate queries." },
        { role: "user", content: prompt }
      ],
      temperature: 0,
    });

    const responseContent = completion.choices[0].message.content?.trim() || '{}';
    let jsonResponse = responseContent;
    if (responseContent.startsWith("```json")) {
      jsonResponse = responseContent.slice(7, -3).trim();
    } else if (responseContent.startsWith("```")) {
      jsonResponse = responseContent.slice(3, -3).trim();
    }

    return JSON.parse(jsonResponse);
  } catch (error) {
    console.error('Error extracting query info:', error);
    return { location: query };
  }
}

async function searchProperties(params: {
  location?: string;
  price_min?: number;
  price_max?: number;
  beds_min?: number;
  baths_min?: number;
  propertyType?: string;
}) {
  try {
    if (!params.location) {
      throw new Error('Location is required for property search');
    }

    const headers = {
    "accept": "application/json",
    "content-type": "application/json",
    "REPLIERS-API-KEY": "yOcZlNOgdLtF0lvK5RyDpNFNCRL61g"
    };

    let apiUrl = `${REPLIERS_API_URL}&city=${encodeURIComponent(params.location)}`;
    
    if (params.price_min) apiUrl += `&price_min=${params.price_min}`;
    if (params.price_max) apiUrl += `&price_max=${params.price_max}`;
    if (params.beds_min) apiUrl += `&beds_min=${params.beds_min}`;
    if (params.baths_min) apiUrl += `&baths_min=${params.baths_min}`;
    if (params.propertyType) apiUrl += `&propertyType=${encodeURIComponent(params.propertyType)}`;

    const response = await axios.get(apiUrl, { headers });
    return response.data;
  } catch (error: any) {
    console.error("Property search error:", error.response?.data || error.message);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Invalid search query' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY || !process.env.REPLIERS_API_KEY) {
      console.warn('Missing API keys - falling back to mock data');
      const mockData = createMockProperties(query);
      return NextResponse.json({
        properties: mockData,
        total: mockData.length,
        source: 'mock',
        error: 'Missing API keys'
      });
    }

    const searchParams = await extractQueryInfo(query);
    console.log('Extracted search params:', searchParams);

    const searchResults = await searchProperties(searchParams);

    if (!searchResults?.listings) {
      const mockData = createMockProperties(searchParams.location);
      return NextResponse.json({
        properties: mockData,
        total: mockData.length,
        source: 'mock',
        error: 'Search failed - using mock data'
      });
    }

    const properties = searchResults.listings.map((listing: any) => ({
      id: listing.listingId?.toString() || Math.random().toString(36).slice(2),
      address: listing.address ? `${listing.address.streetNumber || ''} ${listing.address.streetName || ''}, ${listing.address.city || ''}, ${listing.address.province || ''}` : 'Address not available',
      price: Number(listing.listPrice) || 0,
      bedrooms: Number(listing.details?.bedrooms) || 0,
      bathrooms: Number(listing.details?.bathrooms) || 0,
      sqft: Number(listing.details?.sqft) || 0,
      images: Array.isArray(listing.photos) ? listing.photos : ['/api/placeholder/800/600'],
      propertyType: listing.details?.propertyType || 'Not specified',
      yearBuilt: listing.details?.yearBuilt ? Number(listing.details.yearBuilt) : undefined,
      latitude: Number(listing.address?.latitude) || 0,
      longitude: Number(listing.address?.longitude) || 0
    }));
    // Add debug logging
    console.log('First property data:', searchResults.listings[0]);
    return NextResponse.json({
      properties,
      total: properties.length,
      source: 'api'
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process search request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}