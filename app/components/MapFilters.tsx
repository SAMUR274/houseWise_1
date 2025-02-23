'use client';

import { useState, useEffect } from 'react';
import { MapFiltersProps, FilterState } from '../lib/mapTypes';

export default function MapFilters({ filters, onChange }: MapFiltersProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={localFilters.priceRange[0]}
              onChange={(e) => handleChange('priceRange', [parseInt(e.target.value), localFilters.priceRange[1]])}
              className="w-full p-2 border rounded"
              placeholder="Min"
            />
            <input
              type="number"
              value={localFilters.priceRange[1]}
              onChange={(e) => handleChange('priceRange', [localFilters.priceRange[0], parseInt(e.target.value)])}
              className="w-full p-2 border rounded"
              placeholder="Max"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
          <input
            type="number"
            value={localFilters.bedrooms}
            onChange={(e) => handleChange('bedrooms', parseInt(e.target.value))}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
          <input
            type="number"
            value={localFilters.bathrooms}
            onChange={(e) => handleChange('bathrooms', parseInt(e.target.value))}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Square Footage</label>
          <div className="flex gap-2">
            <input
              type="number"
              value={localFilters.minSqft}
              onChange={(e) => handleChange('minSqft', parseInt(e.target.value))}
              className="w-full p-2 border rounded"
              placeholder="Min"
            />
            <input
              type="number"
              value={localFilters.maxSqft}
              onChange={(e) => handleChange('maxSqft', parseInt(e.target.value))}
              className="w-full p-2 border rounded"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
    </div>
  );
}