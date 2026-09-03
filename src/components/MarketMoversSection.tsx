import React from 'react';
import { ChevronRight } from 'lucide-react';
import { MoverTab, StockMover } from '../types';

interface MarketMoversSectionProps {
  movers: StockMover[];
  activeTab: MoverTab;
  onSelectTab: (tab: MoverTab) => void;
  onSelectStock: (stock: StockMover) => void;
  onExploreAll: () => void;
  isExpanded: boolean;
  categoryTitle?: string;
}

const TABS: MoverTab[] = [
  'Most active',
  'Gainers',
  'Losers',
  'All-time high',
  'Overbought',
];

export const MarketMoversSection: React.FC<MarketMoversSectionProps> = ({
  movers,
  activeTab,
  onSelectTab,
  onSelectStock,
  onExploreAll,
  isExpanded,
  categoryTitle = 'Stock Market Movers',
}) => {
  return (
    <section aria-labelledby="movers-heading" id="market-movers-section" className="space-y-4">
      {/* Table Header Bar with Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-tv-border pb-3">
        <h2 className="text-2xl font-bold text-tv-text" id="movers-heading">
          {categoryTitle}
        </h2>

        {/* Interactive Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1 w-full sm:w-auto">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                id={`movers-tab-${tab.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onSelectTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-tv-text text-white'
                    : 'text-tv-muted hover:text-tv-text hover:bg-tv-pillBg font-medium'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Data Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-tv-border bg-white shadow-2xs">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-tv-bgLight border-b border-tv-border text-tv-muted text-xs font-semibold uppercase tracking-wider">
              <th className="py-3.5 pl-5 pr-4 text-left" scope="col">
                Symbol / Company
              </th>
              <th className="py-3.5 px-4 text-right" scope="col">
                Last
              </th>
              <th className="py-3.5 px-4 text-right" scope="col">
                Chg %
              </th>
              <th className="py-3.5 px-4 text-right" scope="col">
                Chg
              </th>
              <th className="py-3.5 px-4 text-center hidden md:table-cell" scope="col">
                Trend (1D)
              </th>
              <th className="py-3.5 px-4 text-right hidden lg:table-cell" scope="col">
                High
              </th>
              <th className="py-3.5 px-4 text-right hidden lg:table-cell" scope="col">
                Low
              </th>
              <th className="py-3.5 px-4 text-right" scope="col">
                Volume
              </th>
              <th className="py-3.5 pr-5 pl-4 text-right" scope="col">
                Rating
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-tv-border font-medium text-tv-text">
            {movers.map((stock) => {
              const sign = stock.changePercent >= 0 ? '+' : '';
              return (
                <tr
                  key={stock.symbol}
                  id={`stock-row-${stock.symbol.toLowerCase()}`}
                  onClick={() => onSelectStock(stock)}
                  className="hover:bg-tv-bgLight/60 transition-colors cursor-pointer group"
                >
                  {/* Symbol & Company */}
                  <td className="py-4 pl-5 pr-4 flex items-center gap-3">
                    <span
                      className={`w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-xs flex-shrink-0 ${stock.avatarBg}`}
                    >
                      {stock.avatarText}
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-tv-text group-hover:text-tv-blue transition-colors">
                        {stock.symbol}
                      </span>
                      <span className="text-xs text-tv-muted truncate max-w-[140px] sm:max-w-[200px]">
                        {stock.name}
                      </span>
                    </div>
                  </td>

                  {/* Last Price */}
                  <td className="py-4 px-4 text-right font-semibold">
                    ${stock.last.toFixed(2)}
                  </td>

                  {/* Change % */}
                  <td
                    className={`py-4 px-4 text-right font-semibold ${
                      stock.isPositive ? 'text-tv-green' : 'text-tv-red'
                    }`}
                  >
                    {sign}
                    {stock.changePercent.toFixed(2)}%
                  </td>

                  {/* Change $ */}
                  <td
                    className={`py-4 px-4 text-right font-semibold ${
                      stock.isPositive ? 'text-tv-green' : 'text-tv-red'
                    }`}
                  >
                    {sign}
                    {stock.change.toFixed(2)}
                  </td>

                  {/* Trend (1D) */}
                  <td className="py-4 px-4 hidden md:table-cell text-center">
                    <svg className="w-20 h-5 inline-block" viewBox="0 0 60 15">
                      <polyline
                        fill="none"
                        points={stock.trendPoints}
                        stroke={stock.isPositive ? '#089981' : '#f23645'}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </td>

                  {/* High */}
                  <td className="py-4 px-4 text-right hidden lg:table-cell text-tv-muted font-normal">
                    ${stock.high.toFixed(2)}
                  </td>

                  {/* Low */}
                  <td className="py-4 px-4 text-right hidden lg:table-cell text-tv-muted font-normal">
                    ${stock.low.toFixed(2)}
                  </td>

                  {/* Volume */}
                  <td className="py-4 px-4 text-right text-tv-text">
                    {stock.volume}
                  </td>

                  {/* Rating */}
                  <td className="py-4 pr-5 pl-4 text-right">
                    {stock.rating === 'Strong Buy' ? (
                      <span className="inline-block px-2.5 py-1 text-xs font-bold rounded-md bg-tv-green-light text-tv-green">
                        Strong Buy
                      </span>
                    ) : stock.rating === 'Buy' ? (
                      <span className="inline-block px-2.5 py-1 text-xs font-bold rounded-md bg-tv-green-light text-tv-green">
                        Buy
                      </span>
                    ) : stock.rating === 'Neutral' ? (
                      <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-md bg-tv-pillBg text-tv-muted">
                        Neutral
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-1 text-xs font-bold rounded-md bg-tv-red-light text-tv-red">
                        Sell
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer / See More */}
      <div className="pt-2 text-right">
        <button
          id="explore-all-stocks-btn"
          onClick={onExploreAll}
          className="text-sm font-semibold text-tv-blue hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          {isExpanded ? 'Show top movers only' : 'Explore all US stocks'}
          <ChevronRight className="w-4 h-4 stroke-[2]" />
        </button>
      </div>
    </section>
  );
};
