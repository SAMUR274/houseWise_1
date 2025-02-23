'use client';

import { Popup } from 'react-leaflet';
import { PropertyPopupProps } from '../lib/mapTypes';

export default function PropertyPopup({ property, onClose }: PropertyPopupProps) {
  return (
    <Popup
      <div className="p-4 max-w-sm">
        <h3 className="text-lg font-semibold mb-2">${property.price.toLocaleString()}</h3>
        <p className="text-gray-600 mb-2">{property.address}</p>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
          <span>{property.bedrooms} beds</span>
          <span>{property.bathrooms} baths</span>
          <span>{property.sqft.toLocaleString()} sqft</span>
          {property.yearBuilt && <span>Built {property.yearBuilt}</span>}
        </div>
        <div className="mt-4">
          <a
            href={`/property/${property.id}`}
            className="text-blue-500 hover:text-blue-600 text-sm font-medium"
          >
            View Details
          </a>
        </div>
      </div>
    </Popup>
  );
}