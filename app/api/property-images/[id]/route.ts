import { NextResponse } from 'next/server';

interface PropertyImage {
  id: string;
  propertyId: string;
  url: string;
  isPrimary: boolean;
}

// Mock database of property images
const propertyImages: { [key: string]: PropertyImage[] } = {
  '1': [
    {
      id: '1',
      propertyId: '1',
      url: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
      isPrimary: true
    },
    {
      id: '2',
      propertyId: '1',
      url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa',
      isPrimary: false
    }
  ],
  '2': [
    {
      id: '3',
      propertyId: '2',
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
      isPrimary: true
    }
  ]
};

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const propertyId = params.id;
    const images = propertyImages[propertyId] || [];

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching property images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch property images' },
      { status: 500 }
    );
  }
}