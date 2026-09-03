import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { MarketCategory } from '../types';

interface HeroSectionProps {
  selectedCategory: MarketCategory;
  onSelectCategory: (cat: MarketCategory) => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

const CATEGORIES: MarketCategory[] = [
  'US stocks',
  'World stocks',
  'Crypto',
  'Futures',
  'Forex',
  'Government bonds',
  'Corporate bonds',
  'ETFs',
  'Economy',
];

const REGIONS = [
  { id: 'all', label: 'Everywhere (Global)' },
  { id: 'us', label: 'United States' },
  { id: 'eu', label: 'Europe' },
  { id: 'asia', label: 'Asia-Pacific' },
  { id: 'americas', label: 'Americas' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedRegion,
  onSelectRegion,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <section id="hero-market-section" className="text-center pt-4 pb-6">
      {/* Title with Dropdown Chevron */}
      <div className="relative inline-block">
        <button
          id="hero-title-dropdown-trigger"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="inline-flex items-center justify-center gap-2 sm:gap-3 cursor-pointer group focus:outline-none"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight text-tv-text group-hover:text-tv-blue transition-colors">
            {selectedRegion === 'Everywhere (Global)' ? 'Markets, everywhere' : `Markets, ${selectedRegion}`}
          </h1>
          <ChevronDown
            className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-tv-text group-hover:text-tv-blue transition-transform duration-200 ${
              dropdownOpen ? 'rotate-180' : ''
            }`}
            strokeWidth={2.5}
          />
        </button>

        {dropdownOpen && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-tv-border rounded-2xl shadow-xl py-2 z-50 text-left animate-in fade-in zoom-in-95 duration-150">
            <div className="px-4 py-1.5 text-xs font-semibold text-tv-muted uppercase tracking-wider">
              Filter by Market Region
            </div>
            {REGIONS.map((region) => (
              <button
                key={region.id}
                onClick={() => {
                  onSelectRegion(region.label);
                  setDropdownOpen(false);
                }}
                className="w-full px-4 py-2.5 text-sm font-medium hover:bg-tv-pillBg flex items-center justify-between transition-colors"
              >
                <span className="text-tv-text">{region.label}</span>
                {selectedRegion === region.label && (
                  <Check className="w-4 h-4 text-tv-blue" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="mt-8 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-2 px-1">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              id={`category-pill-${category.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectCategory(category)}
              className={`px-4 sm:px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#131722] text-white shadow-xs hover:bg-black'
                  : 'text-tv-muted hover:text-tv-text hover:bg-tv-pillBg'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
};
