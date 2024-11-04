import React from 'react';
import { FloorPlan, Filters } from './types';
import { formatPrice } from './utils';
import { ArrowRight } from 'lucide-react';

interface Props {
  plans: FloorPlan[];
  filters: Filters;
  onSelectPlan: (plan: FloorPlan) => void;
}

const FloorPlanGrid: React.FC<Props> = ({ plans, filters, onSelectPlan }) => {
  const filteredPlans = plans.filter(plan => {
    const variants = plan.variants;
    const meetsPrice = plan.basePrice >= filters.minPrice && plan.basePrice <= filters.maxPrice;
    const meetsSqft = variants.some(v => 
      v.sqft >= filters.minSqft && v.sqft <= filters.maxSqft
    );
    const meetsBedrooms = filters.bedrooms === 'any' || variants.some(v => 
      v.bedrooms >= parseInt(filters.bedrooms)
    );
    const meetsBathrooms = filters.bathrooms === 'any' || variants.some(v => 
      v.bathrooms >= parseInt(filters.bathrooms)
    );

    return meetsPrice && meetsSqft && meetsBedrooms && meetsBathrooms;
  });

  return (
    <div
      className="grid md:grid-cols-2 gap-8"
      role="list"
      aria-label="Available floor plans"
    >
      {filteredPlans.map(plan => (
        <div
          key={plan.id}
          className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          role="listitem"
        >
          <div className="relative">
            <img
              src={plan.image}
              alt={`${plan.name} floor plan preview`}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <p className="text-gray-600 mb-6">{plan.description}</p>
            
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Available Configurations:</h4>
              <div className="flex flex-wrap gap-2">
                {plan.variants.map((variant, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-sm"
                  >
                    {variant.sqft} m² • {variant.bedrooms} bed • {variant.bathrooms} bath
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-gray-100">
              <div>
                <span className="block text-sm text-gray-500">Starting from</span>
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(plan.basePrice)}
                </span>
              </div>
              <button
                onClick={() => onSelectPlan(plan)}
                className="group inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                aria-label={`Customize ${plan.name} floor plan`}
              >
                <span className="mr-2">Customize</span>
                <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      ))}

      {filteredPlans.length === 0 && (
        <div
          className="col-span-2 text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200"
          role="alert"
        >
          <p className="text-gray-600 text-lg">
            No floor plans match your selected filters. Try adjusting your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default FloorPlanGrid;