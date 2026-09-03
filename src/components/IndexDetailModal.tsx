import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Star, Bell } from 'lucide-react';
import { IndexItem } from '../types';

interface IndexDetailModalProps {
  indexItem: IndexItem | null;
  onClose: () => void;
}

export const IndexDetailModal: React.FC<IndexDetailModalProps> = ({
  indexItem,
  onClose,
}) => {
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '1Y'>('1D');
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  if (!indexItem) return null;

  return (
    <div
      id="index-detail-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="index-detail-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-2xl w-full border border-tv-border shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-5 border-b border-tv-border flex items-start justify-between bg-tv-bgLight/70">
          <div className="flex items-center gap-3.5">
            <span
              className="w-11 h-11 rounded-full text-white flex items-center justify-center font-bold text-sm shadow-xs"
              style={{ backgroundColor: indexItem.badgeBg }}
            >
              {indexItem.badgeText}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-tv-text">{indexItem.name}</h2>
                <span className="text-xs px-2 py-0.5 rounded bg-tv-pillBg text-tv-muted font-semibold">
                  {indexItem.exchangeCode}
                </span>
              </div>
              <p className="text-sm text-tv-muted font-medium">Global Benchmark Index</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWatchlisted(!isWatchlisted)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isWatchlisted
                  ? 'bg-amber-50 border-amber-300 text-amber-600'
                  : 'border-tv-border text-tv-muted hover:bg-white hover:text-tv-text'
              }`}
            >
              <Star className={`w-4 h-4 ${isWatchlisted ? 'fill-current' : ''}`} />
            </button>
            <button
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
              {indexItem.price}
            </span>
            <span
              className={`inline-flex items-center gap-1 font-bold text-sm ${
                indexItem.isPositive ? 'text-tv-green' : 'text-tv-red'
              }`}
            >
              {indexItem.isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {indexItem.changeValue} ({indexItem.changePercent})
            </span>
          </div>

          <div className="flex items-center bg-tv-pillBg p-0.5 rounded-lg text-xs font-semibold text-tv-muted">
            {(['1D', '5D', '1M', '1Y'] as const).map((tf) => (
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

        {/* Chart View */}
        <div className="px-6 pt-5 pb-3 bg-gradient-to-b from-white to-tv-bgLight/30">
          <div className="h-44 w-full">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 25"
              preserveAspectRatio="none"
            >
              <polyline
                fill="none"
                points={indexItem.sparklinePoints}
                stroke={indexItem.isPositive ? '#089981' : '#f23645'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex justify-between text-[11px] text-tv-muted font-medium pt-2 border-t border-tv-border/60">
            <span>Market Open</span>
            <span>Midday</span>
            <span>Market Close</span>
          </div>
        </div>

        {/* Description and metadata */}
        <div className="p-6 space-y-4 bg-white">
          <p className="text-sm text-tv-text leading-relaxed">
            {indexItem.description ||
              'Real-time market index tracking composite securities performance.'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-tv-bgLight rounded-xl border border-tv-border/60">
              <span className="text-[11px] font-semibold text-tv-muted uppercase block">
                52W High
              </span>
              <span className="text-sm font-bold text-tv-text">
                {indexItem.high52w || '6,017.31'}
              </span>
            </div>
            <div className="p-3 bg-tv-bgLight rounded-xl border border-tv-border/60">
              <span className="text-[11px] font-semibold text-tv-muted uppercase block">
                52W Low
              </span>
              <span className="text-sm font-bold text-tv-text">
                {indexItem.low52w || '4,103.78'}
              </span>
            </div>
            <div className="p-3 bg-tv-bgLight rounded-xl border border-tv-border/60 col-span-2 sm:col-span-1">
              <span className="text-[11px] font-semibold text-tv-muted uppercase block">
                Components
              </span>
              <span className="text-sm font-bold text-tv-text">
                {indexItem.badgeText === '500' ? '503 Stocks' : indexItem.badgeText === '100' ? '101 Stocks' : indexItem.badgeText === '30' ? '30 Blue Chips' : '2000 Small Caps'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-tv-bgLight border-t border-tv-border flex items-center justify-between">
          <span className="text-xs text-tv-muted">
            Indices provided in real-time under CBOE & CME licensing.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-tv-text hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
