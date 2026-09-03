import React from 'react';
import { LiveTicker } from '../types';

interface LiveTickerTapeProps {
  tickers: LiveTicker[];
  onSelectTicker: (symbol: string) => void;
  flashSymbol?: string | null;
}

export const LiveTickerTape: React.FC<LiveTickerTapeProps> = ({
  tickers,
  onSelectTicker,
  flashSymbol,
}) => {
  return (
    <section
      aria-label="Live Market Ticker"
      id="live-market-ticker-section"
      className="bg-tv-bgLight border-b border-tv-border py-2 overflow-x-auto no-scrollbar"
    >
      <div className="max-w-[1440px] mx-auto px-4 flex items-center space-x-6 text-xs whitespace-nowrap">
        {tickers.map((ticker, index) => {
          const isFlashing = flashSymbol === ticker.symbol;
          return (
            <React.Fragment key={ticker.symbol}>
              <button
                id={`ticker-item-${ticker.symbol.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => onSelectTicker(ticker.symbol)}
                className={`flex items-center space-x-2 py-0.5 px-1.5 rounded transition-all cursor-pointer group ${
                  isFlashing
                    ? ticker.isPositive
                      ? 'bg-tv-green-light scale-105'
                      : 'bg-tv-red-light scale-105'
                    : 'hover:bg-tv-pillBg'
                }`}
              >
                <span className="font-bold text-tv-text group-hover:text-tv-blue transition-colors">
                  {ticker.symbol}
                </span>
                <span className="text-tv-text font-medium">{ticker.price}</span>
                <span
                  className={`font-semibold flex items-center ${
                    ticker.isPositive ? 'text-tv-green' : 'text-tv-red'
                  }`}
                >
                  {ticker.change}
                </span>
              </button>

              {index < tickers.length - 1 && (
                <div className="h-3 w-[1px] bg-tv-border flex-shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
};
