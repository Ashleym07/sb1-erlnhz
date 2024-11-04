import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import FloorPlanFilters from './FloorPlanFilters';
import FloorPlanGrid from './FloorPlanGrid';
import FloorPlanCustomizer from './FloorPlanCustomizer';
import { FloorPlan } from './types';

const initialFloorPlans: FloorPlan[] = [
  {
    id: 'fp1',
    name: 'The Aspen',
    basePrice: 850000,
    variants: [
      { sqft: 185, bedrooms: 4, bathrooms: 2.5 },
      { sqft: 210, bedrooms: 4, bathrooms: 3 },
      { sqft: 235, bedrooms: 5, bathrooms: 3.5 }
    ],
    description: 'Modern farmhouse with open concept living',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80',
    upgrades: [
      { id: 'u1', name: 'Premium Kitchen Package', price: 45000 },
      { id: 'u2', name: 'Smart Home Integration', price: 15000 },
      { id: 'u3', name: 'Extended Garage', price: 25000 }
    ]
  },
  {
    id: 'fp2',
    name: 'The Birch',
    basePrice: 920000,
    variants: [
      { sqft: 195, bedrooms: 3, bathrooms: 2.5 },
      { sqft: 220, bedrooms: 4, bathrooms: 3 },
      { sqft: 245, bedrooms: 4, bathrooms: 3.5 }
    ],
    description: 'Contemporary design with luxury finishes',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
    upgrades: [
      { id: 'u4', name: 'Deluxe Master Suite', price: 35000 },
      { id: 'u5', name: 'Outdoor Kitchen', price: 30000 },
      { id: 'u6', name: 'Solar Package', price: 20000 }
    ]
  }
];

const FloorPlanExplorer = () => {
  const [selectedPlan, setSelectedPlan] = useState<FloorPlan | null>(null);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 2000000,
    minSqft: 0,
    maxSqft: 500,
    bedrooms: 'any',
    bathrooms: 'any'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilters = () => setIsFilterOpen(!isFilterOpen);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gray-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80"
          alt="Luxury home interior"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Discover Your Perfect Floor Plan
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Explore our collection of thoughtfully designed layouts, each crafted to elevate your living experience
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Available Designs
            </h2>
            <p className="text-gray-600">
              Customize your dream home from our signature collection
            </p>
          </div>
          <button
            onClick={toggleFilters}
            className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            aria-expanded={isFilterOpen}
            aria-controls="filter-panel"
          >
            <Filter className="mr-2" size={20} />
            <span>Refine Search</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <FloorPlanFilters
              isOpen={isFilterOpen}
              filters={filters}
              setFilters={setFilters}
            />
          </div>

          <div className="lg:col-span-9">
            {selectedPlan ? (
              <FloorPlanCustomizer
                plan={selectedPlan}
                onBack={() => setSelectedPlan(null)}
              />
            ) : (
              <FloorPlanGrid
                plans={initialFloorPlans}
                filters={filters}
                onSelectPlan={setSelectedPlan}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanExplorer;