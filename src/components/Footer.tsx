import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="app-footer" className="border-t border-tv-border bg-white mt-16 text-tv-muted text-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-6">
          <span className="text-tv-text font-bold text-sm">© 2025 TradingView</span>
          <a href="#" className="hover:text-tv-text transition-colors">
            Terms of use
          </a>
          <a href="#" className="hover:text-tv-text transition-colors">
            Privacy policy
          </a>
          <a href="#" className="hover:text-tv-text transition-colors">
            Disclaimer
          </a>
        </div>
        <div className="text-tv-muted">
          Select market data provided by ICE Data Services • Real-time quote feed
        </div>
      </div>
    </footer>
  );
};
