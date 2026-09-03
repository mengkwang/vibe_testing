import React from 'react';
import { ChevronRight } from 'lucide-react';
import { IndexItem } from '../types';

interface IndicesSectionProps {
  indices: IndexItem[];
  onSelectIndex: (index: IndexItem) => void;
  categoryName?: string;
}

export const IndicesSection: React.FC<IndicesSectionProps> = ({
  indices,
  onSelectIndex,
  categoryName = 'Indices',
}) => {
  return (
    <section aria-labelledby="indices-heading" id="indices-section">
      {/* Section Title & Link */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => onSelectIndex(indices[0])}
          className="inline-flex items-center gap-1.5 text-2xl font-bold text-tv-text hover:text-tv-blue transition-colors group cursor-pointer"
          id="indices-heading"
        >
          <span>{categoryName === 'US stocks' ? 'Indices' : `${categoryName} Overview`}</span>
          <ChevronRight className="w-5 h-5 text-tv-text group-hover:text-tv-blue group-hover:translate-x-0.5 transition-all stroke-[2.5]" />
        </button>
      </div>

      {/* Indices Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {indices.map((item) => {
          return (
            <article
              key={item.id}
              id={`index-card-${item.id}`}
              onClick={() => onSelectIndex(item)}
              className="p-5 rounded-2xl bg-tv-bgLight hover:bg-tv-pillBg/80 border border-tv-border/70 transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <span
                      className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-xs shadow-xs flex-shrink-0"
                      style={{ backgroundColor: item.badgeBg }}
                    >
                      {item.badgeText}
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-tv-text group-hover:text-tv-blue transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-xs text-tv-muted uppercase font-semibold">
                        {item.exchangeCode}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      item.isPositive
                        ? 'bg-tv-green-light text-tv-green'
                        : 'bg-tv-red-light text-tv-red'
                    }`}
                  >
                    {item.changePercent}
                  </span>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-2xl font-bold tracking-tight text-tv-text">
                    {item.price}
                  </span>
                  <span
                    className={`text-xs font-semibold flex items-center gap-0.5 ${
                      item.isPositive ? 'text-tv-green' : 'text-tv-red'
                    }`}
                  >
                    {item.changeValue}
                  </span>
                </div>
              </div>

              {/* Mini Sparkline SVG */}
              <div className="mt-3 h-10 w-full overflow-hidden">
                <svg
                  className="w-full h-full"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 25"
                >
                  <polyline
                    fill="none"
                    points={item.sparklinePoints}
                    stroke={item.isPositive ? '#089981' : '#f23645'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
