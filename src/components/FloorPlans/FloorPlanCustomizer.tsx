import React, { useState } from 'react';
import { ArrowLeft, Printer, RotateCw, Download, Maximize, MinusCircle, PlusCircle, Split } from 'lucide-react';
import { FloorPlan, FloorPlanVariant } from './types';
import { formatPrice } from './utils';

interface Props {
  plan: FloorPlan;
  onBack: () => void;
}

const FloorPlanCustomizer: React.FC<Props> = ({ plan, onBack }) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const selectedVariant = plan.variants[selectedVariantIndex];
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleUpgradeToggle = (upgradeId: string) => {
    setSelectedUpgrades(prev =>
      prev.includes(upgradeId)
        ? prev.filter(id => id !== upgradeId)
        : [...prev, upgradeId]
    );
  };

  const calculateTotal = () => {
    const sizeMultiplier = 1 + (selectedVariantIndex * 0.15); // 15% increase per size tier
    const basePrice = plan.basePrice * sizeMultiplier;
    const upgradeTotal = selectedUpgrades.reduce((total, upgradeId) => {
      const upgrade = plan.upgrades.find(u => u.id === upgradeId);
      return total + (upgrade?.price || 0);
    }, 0);
    return basePrice + upgradeTotal;
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      if (direction === 'in' && prev < 200) return prev + 20;
      if (direction === 'out' && prev > 60) return prev - 20;
      return prev;
    });
  };

  const getSizeVariantLabel = (variant: FloorPlanVariant, index: number) => {
    return `${plan.name} ${variant.sqft}SQ`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Go back to floor plans"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
              <div className="flex items-center gap-6 mt-2 text-gray-600">
                <span>{selectedVariant.sqft} m²</span>
                <span>{selectedVariant.bedrooms} Bedrooms</span>
                <span>{selectedVariant.bathrooms} Bathrooms</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Flip floor plan"
            >
              <RotateCw size={20} />
            </button>
            <button
              onClick={() => handleZoom('in')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={zoomLevel >= 200}
              aria-label="Zoom in"
            >
              <PlusCircle size={20} />
            </button>
            <button
              onClick={() => handleZoom('out')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={zoomLevel <= 60}
              aria-label="Zoom out"
            >
              <MinusCircle size={20} />
            </button>
            <button
              onClick={() => setZoomLevel(100)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Reset zoom"
            >
              <Maximize size={20} />
            </button>
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Compare plans"
            >
              <Split size={20} />
            </button>
          </div>
        </div>

        {/* Size Selector */}
        <div className="mt-6 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Size
          </label>
          <div className="grid grid-cols-3 gap-4">
            {plan.variants.map((variant, index) => (
              <button
                key={index}
                onClick={() => setSelectedVariantIndex(index)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedVariantIndex === index
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-lg font-semibold mb-1">{getSizeVariantLabel(variant, index)}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {variant.bedrooms} bed • {variant.bathrooms} bath
                </div>
                {selectedVariantIndex === index && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gray-900 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-6 mt-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <span className="block text-sm text-gray-600">Total Area</span>
            <span className="text-lg font-semibold transition-all duration-300">
              {selectedVariant.sqft} m²
            </span>
          </div>
          <div>
            <span className="block text-sm text-gray-600">House Width</span>
            <span className="text-lg font-semibold">11.27m</span>
          </div>
          <div>
            <span className="block text-sm text-gray-600">House Length</span>
            <span className="text-lg font-semibold">24.11m</span>
          </div>
          <div>
            <span className="block text-sm text-gray-600">Min Block Width</span>
            <span className="text-lg font-semibold">12.5m</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 p-6">
        {/* Left Sidebar */}
        <div className="col-span-3 space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Features</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Walk-in Pantry
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Outdoor Room
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Master Bed to Front
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                Study Nook
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Design Options</h3>
            <div className="space-y-2">
              {plan.upgrades.map(upgrade => (
                <label
                  key={upgrade.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedUpgrades.includes(upgrade.id)}
                      onChange={() => handleUpgradeToggle(upgrade.id)}
                      className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-500"
                    />
                    <span className="ml-3 text-sm">{upgrade.name}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {formatPrice(upgrade.price)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Base Price</span>
              <span className="font-semibold transition-all duration-300">
                {formatPrice(plan.basePrice * (1 + (selectedVariantIndex * 0.15)))}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Upgrades</span>
              <span className="font-semibold">
                {formatPrice(selectedUpgrades.reduce((total, upgradeId) => {
                  const upgrade = plan.upgrades.find(u => u.id === upgradeId);
                  return total + (upgrade?.price || 0);
                }, 0))}
              </span>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold transition-all duration-300">
                {formatPrice(calculateTotal())}
              </span>
            </div>
          </div>

          <button className="w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
            Download Brochure
          </button>
        </div>

        {/* Floor Plan Display */}
        <div className="col-span-9 bg-gray-50 rounded-lg p-4 relative">
          <div 
            className={`transition-all duration-300 ${
              isFlipped ? 'scale-x-[-1]' : ''
            }`}
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'center center'
            }}
          >
            <img
              src={plan.image}
              alt={`${plan.name} floor plan`}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanCustomizer;