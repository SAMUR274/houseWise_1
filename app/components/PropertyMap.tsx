'use client';

import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { PropertyMapProps, MapProperty, PEACE_RIVER_COORDS, DEFAULT_ZOOM } from '../lib/mapTypes';
import PropertyMarker from './PropertyMarker';
import PropertyPopup from './PropertyPopup';

export default function PropertyMap({ properties, onPropertySelect }: PropertyMapProps) {
  const [selectedProperty, setSelectedProperty] = useState<MapProperty | null>(null);

  const handleMarkerClick = (property: MapProperty) => {
    setSelectedProperty(property);
    if (onPropertySelect) {
      onPropertySelect(property);
    }
  };

  const handlePopupClose = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[PEACE_RIVER_COORDS.lat, PEACE_RIVER_COORDS.lng]}
        zoom={DEFAULT_ZOOM}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {properties.map((property) => (
          <PropertyMarker
            key={property.id}
            property={property}
            onClick={handleMarkerClick}
          />
        ))}
        {selectedProperty && (
          <PropertyPopup
            property={selectedProperty}
            onClose={handlePopupClose}
          />
        )}
      </MapContainer>
    </div>
  );
}