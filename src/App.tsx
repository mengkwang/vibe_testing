/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { LiveTickerTape } from './components/LiveTickerTape';
import { HeroSection } from './components/HeroSection';
import { IndicesSection } from './components/IndicesSection';
import { MarketMoversSection } from './components/MarketMoversSection';
import { StockDetailModal } from './components/StockDetailModal';
import { IndexDetailModal } from './components/IndexDetailModal';
import { SearchModal } from './components/SearchModal';
import { GetStartedModal } from './components/GetStartedModal';
import { Footer } from './components/Footer';
import {
  INITIAL_TICKERS,
  CATEGORY_INDICES,
  STOCK_MOVERS_BY_TAB,
} from './data/marketData';
import {
  IndexItem,
  LiveTicker,
  MarketCategory,
  MoverTab,
  StockMover,
} from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('US stocks');
  const [selectedRegion, setSelectedRegion] = useState('Everywhere (Global)');
  const [activeMoverTab, setActiveMoverTab] = useState<MoverTab>('Most active');
  const [isExpanded, setIsExpanded] = useState(false);

  // Live quotes & tickers state
  const [tickers, setTickers] = useState<LiveTicker[]>(INITIAL_TICKERS);
  const [flashSymbol, setFlashSymbol] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(true);

  // Modals
  const [selectedStock, setSelectedStock] = useState<StockMover | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<IndexItem | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);

  // Watchlist
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tv_watchlist');
      return saved ? JSON.parse(saved) : ['NVDA', 'AAPL'];
    } catch {
      return ['NVDA', 'AAPL'];
    }
  });

  const toggleWatchlist = (symbol: string) => {
    setWatchlist((prev) => {
      const next = prev.includes(symbol)
        ? prev.filter((s) => s !== symbol)
        : [...prev, symbol];
      try {
        localStorage.setItem('tv_watchlist', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Live price tick simulation
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const randIdx = Math.floor(Math.random() * tickers.length);
      const target = tickers[randIdx];

      // Slight fluctuation
      const delta = (Math.random() - 0.48) * 0.003;
      const cleanPrice = parseFloat(target.price.replace(/,/g, '').replace('%', ''));
      if (isNaN(cleanPrice)) return;

      const newPriceNum = cleanPrice * (1 + delta);
      const formattedPrice = cleanPrice > 1000
        ? newPriceNum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : target.price.includes('%')
        ? `${newPriceNum.toFixed(2)}%`
        : newPriceNum.toFixed(cleanPrice < 2 ? 4 : 2);

      const newChgNum = target.changeNum + (delta * 100);
      const isPos = newChgNum >= 0;
      const formattedChg = `${isPos ? '+' : ''}${newChgNum.toFixed(2)}%`;

      setTickers((prev) =>
        prev.map((t, idx) =>
          idx === randIdx
            ? {
                ...t,
                price: formattedPrice,
                change: formattedChg,
                changeNum: newChgNum,
                isPositive: isPos,
              }
            : t
        )
      );

      setFlashSymbol(target.symbol);
      const timeout = setTimeout(() => setFlashSymbol(null), 1000);
      return () => clearTimeout(timeout);
    }, 3800);

    return () => clearInterval(interval);
  }, [isLive, tickers.length]);

  // Handle selecting a ticker from the tape
  const handleSelectTicker = (symbol: string) => {
    // Check if it's one of our stocks
    const allStocks = Object.values(STOCK_MOVERS_BY_TAB).flat();
    const foundStock = allStocks.find((s) => s.symbol.toUpperCase() === symbol.toUpperCase());
    if (foundStock) {
      setSelectedStock(foundStock);
      return;
    }

    // Check if it's an index
    const allIndices = Object.values(CATEGORY_INDICES).flat();
    const foundIndex = allIndices.find((i) => i.name.toUpperCase().includes(symbol.toUpperCase()) || i.badgeText === symbol);
    if (foundIndex) {
      setSelectedIndex(foundIndex);
      return;
    }

    // Default: open search modal with query
    setIsSearchOpen(true);
  };

  // Get current indices
  const currentIndices = CATEGORY_INDICES[selectedCategory] || CATEGORY_INDICES['US stocks'];

  // Get current movers based on tab
  const rawMovers = STOCK_MOVERS_BY_TAB[activeMoverTab] || STOCK_MOVERS_BY_TAB['Most active'];
  const displayMovers = isExpanded ? rawMovers : rawMovers.slice(0, 6);

  // All searchable stocks
  const allSearchableStocks = Array.from(
    new Map(Object.values(STOCK_MOVERS_BY_TAB).flat().map((s) => [s.symbol, s])).values()
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-tv-text font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Top Navigation Bar */}
      <TopNav
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenGetStarted={() => setIsGetStartedOpen(true)}
        isLive={isLive}
        onToggleLive={() => setIsLive(!isLive)}
      />

      {/* Live Ticker Tape */}
      <LiveTickerTape
        tickers={tickers}
        onSelectTicker={handleSelectTicker}
        flashSymbol={flashSymbol}
      />

      {/* Main Content */}
      <main className="flex-grow max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Hero Section */}
        <HeroSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />

        {/* Market Indices Section */}
        <IndicesSection
          indices={currentIndices}
          onSelectIndex={(index) => setSelectedIndex(index)}
          categoryName={selectedCategory}
        />

        {/* Stock Market Movers Table Section */}
        <MarketMoversSection
          movers={displayMovers}
          activeTab={activeMoverTab}
          onSelectTab={setActiveMoverTab}
          onSelectStock={(stock) => setSelectedStock(stock)}
          onExploreAll={() => setIsExpanded(!isExpanded)}
          isExpanded={isExpanded}
          categoryTitle={
            selectedCategory === 'US stocks'
              ? 'Stock Market Movers'
              : `${selectedCategory} Movers`
          }
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Stock Detail Modal */}
      <StockDetailModal
        stock={selectedStock}
        onClose={() => setSelectedStock(null)}
        isWatchlisted={selectedStock ? watchlist.includes(selectedStock.symbol) : false}
        onToggleWatchlist={toggleWatchlist}
      />

      {/* Index Detail Modal */}
      <IndexDetailModal
        indexItem={selectedIndex}
        onClose={() => setSelectedIndex(null)}
      />

      {/* Spotlight Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        stocks={allSearchableStocks}
        onSelectStock={(stock) => setSelectedStock(stock)}
      />

      {/* Get Started Authentication Modal */}
      <GetStartedModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
      />
    </div>
  );
}
