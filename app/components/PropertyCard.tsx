import { Property } from '../lib/types';
import Link from 'next/link';
import Image from 'next/image';

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/property/${property.id}`} className="block">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div className="relative">
          {property.images?.[0] ? (
            <Image
              src={property.images[0]}
              alt={property.address}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
              priority={false}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
          {property.propertyType && (
            <span className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-sm">
              {property.propertyType}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold">${property.price.toLocaleString()}</h3>
          <p className="text-gray-600">{property.address}</p>
          <div className="mt-2 flex gap-4 text-sm text-gray-500">
            <span>{property.bedrooms} beds</span>
            <span>{property.bathrooms} baths</span>
            <span>{property.sqft.toLocaleString()} sqft</span>
            {property.yearBuilt && <span>Built {property.yearBuilt}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}