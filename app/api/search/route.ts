import { OpenAI } from 'openai';
import axios from 'axios';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ZILLOW_API_URL = process.env.ZILLOW_API_URL;
const ZILLOW_API_KEY = process.env.ZILLOW_API_KEY;
const ZILLOW_API_HOST = process.env.ZILLOW_API_HOST;

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
  yearBuilt: 2010
}];

async function extractQueryInfo(query: string) {
  const prompt = `
    Extract the following structured information from the real estate query:
    - "location": The city or area the user is interested in.
    - "price": The maximum price the user is willing to pay (numeric value).
    - "bedrooms": The number of bedrooms the user is looking for (numeric value).
    - "bathrooms": The number of bathrooms the user is looking for (numeric value).
    - "square_feet": The minimum square footage the user is looking for (numeric value).
    - "home_type": The type of home (Houses, Apartments, Condos, Townhomes, Multi-family, Manufactured, LotsLand).
    
    If any field is not explicitly mentioned in the query, set its value to null.
    Query: "${query}"
    Return the output as a JSON object.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
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
    return { location: query }; // Fallback to using raw query as location
  }
}

async function searchProperties(params: {
  location?: string;
  home_type?: string;
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
}) {
  try {
    if (!params.location) {
      throw new Error('Location is required for property search');
    }

    console.log('Making API request with params:', {
      location: params.location,
      home_type: params.home_type,
      price_max: params.price,
      beds_min: params.bedrooms,
      baths_min: params.bathrooms,
      sqft_min: params.square_feet
    });

    const headers = {
      'X-RapidAPI-Key': ZILLOW_API_KEY!,
      'X-RapidAPI-Host': ZILLOW_API_HOST!,
      'Content-Type': 'application/json'
    };

    const response = await axios.get(ZILLOW_API_URL!, {
      headers,
      params: {
        location: params.location,
        home_type: params.home_type || undefined,
        price_max: params.price || undefined,
        beds_min: params.bedrooms || undefined,
        baths_min: params.bathrooms || undefined,
        sqft_min: params.square_feet || undefined,
        status_type: 'ForSale'
      }
    });

    console.log('API response status:', response.status);
    console.log('Properties found:', response.data?.properties?.length || 0);

    return response.data;
  } catch (error: any) {
    console.error("Property search error:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data
    });
    return null;
  }
}

export async function POST(req: Request) {
  try {
    // Get and validate query
    const { query } = await req.json();
    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Invalid search query' },
        { status: 400 }
      );
    }

    // Check API keys early
    if (!process.env.OPENAI_API_KEY || !process.env.ZILLOW_API_KEY || !process.env.ZILLOW_API_HOST) {
      console.warn('Missing API keys - falling back to mock data');
      const mockData = createMockProperties(query);
      return NextResponse.json({
        properties: mockData,
        total: mockData.length,
        source: 'mock',
        error: 'Missing API keys'
      });
    }

    // Extract search parameters
    const searchParams = await extractQueryInfo(query);
    console.log('Extracted search params:', searchParams);

    // Search properties
    const searchResults = await searchProperties(searchParams);

    // Handle failed search
    if (!searchResults?.properties) {
      const mockData = createMockProperties(searchParams.location);
      return NextResponse.json({
        properties: mockData,
        total: mockData.length,
        source: 'mock',
        error: 'Search failed - using mock data'
      });
    }

    // Map API response to our Property interface
    const properties = searchResults.properties.map((prop: {
      id?: string | number;
      address?: string;
      price?: string | number;
      bedrooms?: string | number;
      bathrooms?: string | number;
      square_feet?: string | number;
      images?: string[];
      home_type?: string;
      year_built?: string | number;
    }) => ({
      id: prop.id?.toString() || Math.random().toString(36).slice(2),
      address: prop.address || 'Address not available',
      price: Number(prop.price) || 0,
      bedrooms: Number(prop.bedrooms) || 0,
      bathrooms: Number(prop.bathrooms) || 0,
      sqft: Number(prop.square_feet) || 0,
      images: Array.isArray(prop.images) ? prop.images : ['/api/placeholder/800/600'],
      propertyType: prop.home_type || 'Not specified',
      yearBuilt: prop.year_built ? Number(prop.year_built) : undefined
    }));

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