import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { StockMover } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  stocks: StockMover[];
  onSelectStock: (stock: StockMover) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  stocks,
  onSelectStock,
}) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Stocks' | 'Crypto' | 'Indices'>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // handled by parent or opened
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = stocks.filter((stock) => {
    const matchText =
      stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
      stock.name.toLowerCase().includes(query.toLowerCase());
    return matchText;
  });

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4"
      onClick={onClose}
    >
      <div
        id="search-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-xl w-full border border-tv-border shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-tv-border flex items-center gap-3">
          <Search className="w-5 h-5 text-tv-muted flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, company, or market..."
            className="w-full text-base text-tv-text placeholder-tv-muted bg-transparent focus:outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-tv-pillBg text-tv-muted cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold text-tv-muted hover:text-tv-text bg-tv-pillBg rounded cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 border-b border-tv-border/60 bg-tv-bgLight flex items-center gap-2 overflow-x-auto no-scrollbar">
          {(['All', 'Stocks', 'Crypto', 'Indices'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                activeFilter === filter
                  ? 'bg-tv-text text-white'
                  : 'text-tv-muted hover:text-tv-text hover:bg-tv-pillBg'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-80 overflow-y-auto divide-y divide-tv-border/60">
          {filtered.length > 0 ? (
            filtered.map((stock) => {
              const sign = stock.changePercent >= 0 ? '+' : '';
              return (
                <button
                  key={stock.symbol}
                  onClick={() => {
                    onSelectStock(stock);
                    onClose();
                  }}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-tv-bgLight transition-colors text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-xs ${stock.avatarBg}`}
                    >
                      {stock.avatarText}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-tv-text group-hover:text-tv-blue">
                          {stock.symbol}
                        </span>
                        <span className="text-[11px] px-1.5 py-0.2 rounded bg-tv-pillBg text-tv-muted">
                          Stock
                        </span>
                      </div>
                      <span className="text-xs text-tv-muted">{stock.name}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-sm text-tv-text">
                      ${stock.last.toFixed(2)}
                    </div>
                    <div
                      className={`text-xs font-semibold flex items-center justify-end gap-0.5 ${
                        stock.isPositive ? 'text-tv-green' : 'text-tv-red'
                      }`}
                    >
                      {stock.isPositive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {sign}
                      {stock.changePercent.toFixed(2)}%
                    </div>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-12 text-center text-tv-muted text-sm">
              No matching assets found for "{query}".
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-tv-bgLight/80 border-t border-tv-border flex items-center justify-between text-[11px] text-tv-muted">
          <span>Search stocks, ETFs, crypto, and futures in real-time</span>
          <span className="flex items-center gap-1 font-semibold text-tv-blue">
            Press Enter to select <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
};
