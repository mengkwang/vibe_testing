import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Star, Bell, ExternalLink, BarChart2 } from 'lucide-react';
import { StockMover } from '../types';

interface StockDetailModalProps {
  stock: StockMover | null;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (symbol: string) => void;
}

export const StockDetailModal: React.FC<StockDetailModalProps> = ({
  stock,
  onClose,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '6M' | '1Y'>('1D');
  const [alertSet, setAlertSet] = useState(false);

  if (!stock) return null;

  const sign = stock.changePercent >= 0 ? '+' : '';

  // Generate simulated chart line based on timeframe
  const points = stock.chartHistory && timeframe === '1D'
    ? stock.chartHistory
    : [
        { time: '09:30', price: stock.low },
        { time: '11:00', price: (stock.low * 2 + stock.high) / 3 },
        { time: '13:00', price: (stock.low + stock.high) / 2 },
        { time: '14:30', price: stock.high * 0.98 },
        { time: '16:00', price: stock.last },
      ];

  const minPrice = Math.min(...points.map((p) => p.price)) * 0.998;
  const maxPrice = Math.max(...points.map((p) => p.price)) * 1.002;
  const range = maxPrice - minPrice || 1;

  // Calculate SVG path
  const svgWidth = 600;
  const svgHeight = 220;
  const pathCoordinates = points.map((pt, i) => {
    const x = (i / (points.length - 1)) * svgWidth;
    const y = svgHeight - ((pt.price - minPrice) / range) * (svgHeight - 40) - 20;
    return `${x},${y}`;
  });

  const polylineStr = pathCoordinates.join(' ');
  const areaPath = `M ${pathCoordinates[0]} ${pathCoordinates.map(p => `L ${p}`).join(' ')} L ${svgWidth},${svgHeight} L 0,${svgHeight} Z`;

  // Day range calculation
  const dayProgress = Math.min(
    100,
    Math.max(0, ((stock.last - stock.low) / (stock.high - stock.low || 1)) * 100)
  );

  return (
    <div
      id="stock-detail-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="stock-detail-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-2xl w-full border border-tv-border shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-tv-border flex items-start justify-between bg-tv-bgLight/70">
          <div className="flex items-center gap-3.5">
            <span
              className={`w-11 h-11 rounded-full text-white flex items-center justify-center font-bold text-sm shadow-xs ${stock.avatarBg}`}
            >
              {stock.avatarText}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-tv-text">{stock.symbol}</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-tv-pillBg text-tv-muted font-semibold">
                  NASDAQ
                </span>
                <span className="text-xs text-tv-muted font-medium">
                  {stock.sector || 'Equities'}
                </span>
              </div>
              <p className="text-sm text-tv-muted font-medium">{stock.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="modal-watchlist-btn"
              onClick={() => onToggleWatchlist(stock.symbol)}
              title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isWatchlisted
                  ? 'bg-amber-50 border-amber-300 text-amber-600'
                  : 'border-tv-border text-tv-muted hover:bg-white hover:text-tv-text'
              }`}
            >
              <Star className={`w-4 h-4 ${isWatchlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              id="modal-alert-btn"
              onClick={() => setAlertSet(!alertSet)}
              title={alertSet ? 'Alert is active' : 'Set Price Alert'}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                alertSet
                  ? 'bg-blue-50 border-blue-300 text-tv-blue'
                  : 'border-tv-border text-tv-muted hover:bg-white hover:text-tv-text'
              }`}
            >
              <Bell className={`w-4 h-4 ${alertSet ? 'fill-current' : ''}`} />
            </button>
            <button
              id="modal-close-btn"
              onClick={onClose}
              className="p-2 rounded-lg text-tv-muted hover:text-tv-text hover:bg-tv-pillBg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Price & Highlight Bar */}
        <div className="px-6 py-4 border-b border-tv-border flex flex-wrap items-baseline justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-tv-text">
              ${stock.last.toFixed(2)}
            </span>
            <span
              className={`inline-flex items-center gap-1 font-bold text-sm ${
                stock.isPositive ? 'text-tv-green' : 'text-tv-red'
              }`}
            >
              {stock.isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {sign}
              {stock.change.toFixed(2)} ({sign}
              {stock.changePercent.toFixed(2)}%)
            </span>
          </div>

          {/* Timeframe selector */}
          <div className="flex items-center bg-tv-pillBg p-0.5 rounded-lg text-xs font-semibold text-tv-muted">
            {(['1D', '5D', '1M', '6M', '1Y'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  timeframe === tf
                    ? 'bg-white text-tv-text shadow-2xs font-bold'
                    : 'hover:text-tv-text'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Chart Visual */}
        <div className="px-6 pt-4 pb-2 bg-gradient-to-b from-white to-tv-bgLight/40">
          <div className="h-44 w-full relative">
            <svg
              className="w-full h-full overflow-visible"
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={stock.isPositive ? '#089981' : '#f23645'}
                    stopOpacity="0.25"
                  />
                  <stop
                    offset="100%"
                    stopColor={stock.isPositive ? '#089981' : '#f23645'}
                    stopOpacity="0.0"
                  />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#chartGradient)" />
              <polyline
                fill="none"
                points={polylineStr}
                stroke={stock.isPositive ? '#089981' : '#f23645'}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex justify-between text-[11px] text-tv-muted font-medium pt-2 border-t border-tv-border/60">
            <span>09:30 AM</span>
            <span>11:30 AM</span>
            <span>01:30 PM</span>
            <span>04:00 PM Close</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="p-6 space-y-5 bg-white">
          {/* Day range bar */}
          <div>
            <div className="flex justify-between text-xs text-tv-muted font-medium mb-1.5">
              <span>Day's Low: ${stock.low.toFixed(2)}</span>
              <span className="font-semibold text-tv-text">
                Current: ${stock.last.toFixed(2)}
              </span>
              <span>Day's High: ${stock.high.toFixed(2)}</span>
            </div>
            <div className="h-2 w-full bg-tv-pillBg rounded-full overflow-hidden relative">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  stock.isPositive ? 'bg-tv-green' : 'bg-tv-red'
                }`}
                style={{ width: `${dayProgress}%` }}
              />
            </div>
          </div>

          {/* Key metrics 4-column */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-3 bg-tv-bgLight rounded-xl border border-tv-border/60">
              <span className="text-[11px] font-semibold text-tv-muted uppercase block">
                Market Cap
              </span>
              <span className="text-base font-bold text-tv-text">
                {stock.marketCap || '$1.25T'}
              </span>
            </div>

            <div className="p-3 bg-tv-bgLight rounded-xl border border-tv-border/60">
              <span className="text-[11px] font-semibold text-tv-muted uppercase block">
                P/E Ratio
              </span>
              <span className="text-base font-bold text-tv-text">
                {stock.peRatio || '32.4'}
              </span>
            </div>

            <div className="p-3 bg-tv-bgLight rounded-xl border border-tv-border/60">
              <span className="text-[11px] font-semibold text-tv-muted uppercase block">
                Volume
              </span>
              <span className="text-base font-bold text-tv-text">
                {stock.volume}
              </span>
            </div>

            <div className="p-3 bg-tv-bgLight rounded-xl border border-tv-border/60">
              <span className="text-[11px] font-semibold text-tv-muted uppercase block">
                Analyst Target
              </span>
              <span className="text-base font-bold text-tv-green">
                {stock.analystsTarget || '$210.00'}
              </span>
            </div>
          </div>

          {/* Analyst Consensus Rating */}
          <div className="p-4 rounded-xl border border-tv-border bg-tv-bgLight/40 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-tv-muted uppercase">
                Technical & Fundamental Rating
              </div>
              <div className="text-lg font-extrabold text-tv-text mt-0.5">
                {stock.rating}
              </div>
            </div>
            <span
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                stock.rating === 'Strong Buy' || stock.rating === 'Buy'
                  ? 'bg-tv-green-light text-tv-green'
                  : stock.rating === 'Neutral'
                  ? 'bg-tv-pillBg text-tv-muted'
                  : 'bg-tv-red-light text-tv-red'
              }`}
            >
              84% Buy Consensus
            </span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-tv-bgLight border-t border-tv-border flex items-center justify-between">
          <span className="text-xs text-tv-muted">
            Data delayed by 15 mins • Real-time with TradingView Pro
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-tv-text hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
