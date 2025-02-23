'use client';

import { useState } from 'react';
import PropertyMap from '../components/PropertyMap';
import MapFilters from '../components/MapFilters';
import { MapProperty, FilterState } from '../lib/mapTypes';

const initialFilters: FilterState = {
  priceRange: [0, 1000000],
  bedrooms: 0,
  bathrooms: 0,
  minSqft: 0,
  maxSqft: 0
};

// Sample data - replace with actual API call
const sampleProperties: MapProperty[] = [
  {
    id: '1',
    address: '123 Peace River Ave',
    price: 450000,
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2000,
    yearBuilt: 2015,
    latitude: 56.2350,
    longitude: -117.2895,
    propertyType: 'Single Family',
    images: []
  },
  {
    id: '2',
    address: '456 Alberta Street',
    price: 375000,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1800,
    yearBuilt: 2010,
    latitude: 56.2360,
    longitude: -117.2875,
    propertyType: 'Townhouse',
    images: []
  }
];

export default function MapView() {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [filteredProperties, setFilteredProperties] = useState<MapProperty[]>(sampleProperties);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    
    // Apply filters to properties
    const filtered = sampleProperties.filter(property => {
      const matchesPrice = property.price >= newFilters.priceRange[0] && 
                          property.price <= newFilters.priceRange[1];
      const matchesBeds = !newFilters.bedrooms || property.bedrooms >= newFilters.bedrooms;
      const matchesBaths = !newFilters.bathrooms || property.bathrooms >= newFilters.bathrooms;
      const matchesSqft = (!newFilters.minSqft || property.sqft >= newFilters.minSqft) &&
                         (!newFilters.maxSqft || property.sqft <= newFilters.maxSqft);

      return matchesPrice && matchesBeds && matchesBaths && matchesSqft;
    });

    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Property Map</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <MapFilters
              filters={filters}
              onChange={handleFilterChange}
            />
          </div>
          <div className="lg:col-span-3">
            <PropertyMap properties={filteredProperties} />
          </div>
        </div>
      </div>
    </div>
  );
}