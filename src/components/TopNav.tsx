import React, { useState } from 'react';
import { Search, Globe, User, Check, ChevronDown } from 'lucide-react';

interface TopNavProps {
  onOpenSearch: () => void;
  onOpenGetStarted: () => void;
  isLive: boolean;
  onToggleLive: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  onOpenSearch,
  onOpenGetStarted,
  isLive,
  onToggleLive,
}) => {
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [activeNav, setActiveNav] = useState('Markets');

  const languages = ['EN', 'ES', 'DE', 'FR', 'JA', 'ZH'];
  const navItems = ['Products', 'Community', 'Markets', 'Brokers', 'More'];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-tv-border">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo & Search Bar */}
        <div className="flex items-center gap-6 flex-shrink-0">
          {/* TradingView Brand Logo Glyphs */}
          <a
            href="#"
            id="tradingview-home-logo"
            aria-label="TradingView Home"
            className="flex items-center text-tv-text hover:opacity-85 transition-opacity"
          >
            <svg
              className="w-9 h-7 fill-current"
              viewBox="0 0 36 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M5.5 0H0V28H5.5V0Z" />
              <path d="M16 0H10.5V28H16V0Z" />
              <path d="M26.5 0H21V19H26.5V0Z" />
              <path d="M36 9H30.5V28H36V9Z" />
            </svg>
          </a>

          {/* Quick Search Pill Bar */}
          <div className="relative w-56 sm:w-64 md:w-72 lg:w-80">
            <button
              id="search-trigger-btn"
              onClick={onOpenSearch}
              className="w-full pl-10 pr-12 py-2 bg-tv-pillBg hover:bg-tv-pillHover focus:bg-white text-sm text-left text-tv-muted hover:text-tv-text rounded-full border border-transparent focus:border-tv-blue focus:outline-none transition-colors cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-tv-muted" />
                <span className="truncate">Search (Ctrl+K)</span>
              </div>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white text-tv-muted rounded border border-tv-border shadow-2xs">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden xl:flex items-center space-x-7 font-medium text-sm text-tv-text"
        >
          {navItems.map((item) => {
            const isActive = activeNav === item;
            return (
              <button
                key={item}
                id={`nav-item-${item.toLowerCase()}`}
                onClick={() => setActiveNav(item)}
                className={`relative py-5 font-medium transition-colors ${
                  isActive
                    ? 'text-tv-blue font-semibold'
                    : 'text-tv-muted hover:text-tv-text'
                }`}
              >
                {item}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-tv-blue rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Nav Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
          {/* Live Quote Pulse Toggle */}
          <button
            id="toggle-live-feed-btn"
            onClick={onToggleLive}
            title={isLive ? 'Live market simulation active (click to pause)' : 'Paused (click to resume)'}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border border-tv-border hover:bg-tv-pillBg transition-colors"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isLive ? 'bg-tv-green animate-pulse' : 'bg-gray-400'
              }`}
            />
            <span className="text-tv-text text-[11px] font-semibold">
              {isLive ? 'LIVE' : 'PAUSED'}
            </span>
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              id="lang-picker-btn"
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-sm font-semibold text-tv-text hover:text-tv-blue p-2 rounded-lg transition-colors cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-5 h-5 text-tv-muted" />
              <span>{selectedLang}</span>
              <ChevronDown className="w-3 h-3 text-tv-muted" />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-1 w-28 bg-white border border-tv-border rounded-xl shadow-lg py-1 z-50">
                {languages.map((l) => (
                  <button
                    key={l}
                    onClick={() => {
                      setSelectedLang(l);
                      setLangOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-tv-pillBg flex items-center justify-between"
                  >
                    <span>{l}</span>
                    {selectedLang === l && <Check className="w-3 h-3 text-tv-blue" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Trigger */}
          <button
            id="user-profile-btn"
            onClick={onOpenGetStarted}
            className="text-tv-text hover:text-tv-blue p-2 rounded-full hover:bg-tv-pillBg transition-colors cursor-pointer"
            title="User Profile"
          >
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-tv-text" />
          </button>

          {/* Call to Action Button */}
          <button
            id="get-started-btn"
            onClick={onOpenGetStarted}
            className="tv-btn-gradient text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-xs hover:shadow-md flex items-center justify-center cursor-pointer"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
};
