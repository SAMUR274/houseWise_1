'use client';

import { Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import { PropertyMarkerProps } from '../lib/mapTypes';

const propertyIcon = new Icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function PropertyMarker({ property, onClick }: PropertyMarkerProps) {
  return (
    <Marker
      position={[property.latitude, property.longitude]}
      icon={propertyIcon}
      eventHandlers={{
        click: () => onClick(property)
      }}
    />
  );
}