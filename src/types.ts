export type MarketCategory =
  | 'US stocks'
  | 'World stocks'
  | 'Crypto'
  | 'Futures'
  | 'Forex'
  | 'Government bonds'
  | 'Corporate bonds'
  | 'ETFs'
  | 'Economy';

export type MoverTab =
  | 'Most active'
  | 'Gainers'
  | 'Losers'
  | 'All-time high'
  | 'Overbought';

export type AnalystRating = 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';

export interface LiveTicker {
  symbol: string;
  name?: string;
  price: string;
  change: string;
  changeNum: number;
  isPositive: boolean;
  prefix?: string;
  suffix?: string;
}

export interface IndexItem {
  id: string;
  name: string;
  badgeText: string;
  badgeBg: string;
  exchangeCode: string;
  price: string;
  priceNum: number;
  changePercent: string;
  changeValue: string;
  isPositive: boolean;
  sparklinePoints: string; // SVG polyline points (0-100 x 0-25)
  chartData: { time: string; value: number }[];
  description?: string;
  high52w?: string;
  low52w?: string;
}

export interface StockMover {
  symbol: string;
  name: string;
  avatarText: string;
  avatarBg: string;
  last: number;
  changePercent: number;
  change: number;
  isPositive: boolean;
  trendPoints: string; // SVG polyline points (0-60 x 0-15)
  high: number;
  low: number;
  volume: string;
  volumeNum: number;
  rating: AnalystRating;
  marketCap?: string;
  peRatio?: string;
  sector?: string;
  analystsTarget?: string;
  dayRange?: { low: number; high: number };
  chartHistory?: { time: string; price: number }[];
}
