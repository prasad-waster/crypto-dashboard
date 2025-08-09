export interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  lastUpdated: number;
}

export interface ChartData {
  labels: string[];
  prices: number[];
}

export interface APIError {
  message: string;
  status?: number;
}
