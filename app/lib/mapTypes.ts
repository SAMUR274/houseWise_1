import { Property } from "./types";

export interface MapProperty extends Property {
  latitude: number;
  longitude: number;
}

export interface FilterState {
  priceRange: [number, number];
  bedrooms: number;
  bathrooms: number;
  minSqft: number;
  maxSqft: number;
}

export interface PropertyMarkerProps {
  property: MapProperty;
  onClick: (property: MapProperty) => void;
}

export interface PropertyPopupProps {
  property: MapProperty;
  onClose: () => void;
}

export interface MapFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

export interface PropertyMapProps {
  properties: MapProperty[];
  onPropertySelect?: (property: MapProperty) => void;
}

export const PEACE_RIVER_COORDS = {
  lat: 56.2350,
  lng: -117.2895
};

export const DEFAULT_ZOOM = 10;