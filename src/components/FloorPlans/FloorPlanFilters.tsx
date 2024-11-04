import React from 'react';
import { Filters } from './types';

interface Props {
  isOpen: boolean;
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

const FloorPlanFilters: React.FC<Props> = ({ isOpen, filters, setFilters }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  if (!isOpen) return null;

  return (
    <div
      id="filter-panel"
      className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm"
      role="region"
      aria-label="Floor plan filters"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-6">Refine Your Search</h2>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Price Range
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="minPrice" className="sr-only">
                Minimum Price
              </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                aria-label="Minimum price"
                placeholder="Min"
              />
            </div>
            <div>
              <label htmlFor="maxPrice" className="sr-only">
                Maximum Price
              </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                aria-label="Maximum price"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Square Footage
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="minSqft" className="sr-only">
                Minimum SQ
              </label>
              <input
                type="number"
                id="minSqft"
                name="minSqft"
                value={filters.minSqft}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                aria-label="Minimum SQ"
                placeholder="Min"
              />
            </div>
            <div>
              <label htmlFor="maxSqft" className="sr-only">
                Maximum SQ
              </label>
              <input
                type="number"
                id="maxSqft"
                name="maxSqft"
                value={filters.maxSqft}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                aria-label="Maximum SQ"
                placeholder="Max"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-900 mb-3">
            Bedrooms
          </label>
          <select
            id="bedrooms"
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          >
            <option value="any">Any</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        <div>
          <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-900 mb-3">
            Bathrooms
          </label>
          <select
            id="bathrooms"
            name="bathrooms"
            value={filters.bathrooms}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
          >
            <option value="any">Any</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanFilters;