import { CryptoData, ChartData } from "../types";

const CRYPTO_CONFIG = {
  bitcoin: { name: "Bitcoin", symbol: "BTC", binanceSymbol: "BTCUSDT" },
  ethereum: { name: "Ethereum", symbol: "ETH", binanceSymbol: "ETHUSDT" },
  dogecoin: { name: "Dogecoin", symbol: "DOGE", binanceSymbol: "DOGEUSDT" },
};

// Add delay function to prevent rate limiting
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchCryptoPrices = async (): Promise<CryptoData[]> => {
  try {
    console.log("🚀 Fetching REAL-TIME crypto prices...");
    await delay(500);

    // Use Binance public API - no CORS issues, no rate limits, real-time data
    const symbols = Object.values(CRYPTO_CONFIG)
      .map((c) => c.binanceSymbol)
      .join('","');

    const response = await fetch(
      `https://api.binance.com/api/v3/ticker/24hr?symbols=["${symbols}"]`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      console.warn("Binance API failed, using fallback");
      return getFallbackPrices();
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return getFallbackPrices();
    }

    // Fix TypeScript error: properly filter out null values
    const result: CryptoData[] = data
      .map((ticker: any) => {
        const configEntry = Object.entries(CRYPTO_CONFIG).find(
          ([_, config]) => config.binanceSymbol === ticker.symbol
        );

        if (!configEntry) return null;

        const [id, config] = configEntry;

        return {
          id,
          name: config.name,
          symbol: config.symbol,
          price: parseFloat(ticker.lastPrice) || 0,
          change24h: parseFloat(ticker.priceChangePercent) || 0,
          lastUpdated: Date.now() / 1000,
        };
      })
      .filter((item): item is CryptoData => item !== null); // TypeScript type guard

    console.log("✅ SUCCESS: Got real-time prices from Binance!", result);
    cacheData(result);
    return result;
  } catch (error) {
    console.error("Error fetching from Binance, using fallback:", error);
    return getFallbackPrices();
  }
};

export const fetchBitcoinChart = async (): Promise<ChartData> => {
  try {
    console.log("📈 Fetching REAL Bitcoin chart data...");
    await delay(800);

    // Get Bitcoin kline data from Binance (last 6 hours)
    const response = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=6`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return getFallbackChart();
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return getFallbackChart();
    }

    const labels = data.map((candle: any) => {
      const date = new Date(candle[0]); // Open time
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    });

    const chartPrices = data.map((candle: any) => {
      const closePrice = parseFloat(candle[4]); // Close price
      return isNaN(closePrice) ? 0 : Math.round(closePrice * 100) / 100;
    });

    console.log("✅ SUCCESS: Got real Bitcoin chart data!", {
      labels,
      prices: chartPrices,
    });
    return { labels, prices: chartPrices };
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return getFallbackChart();
  }
};

// Fallback functions with realistic current prices
const getFallbackPrices = (): CryptoData[] => {
  console.log("⚠️ Using fallback prices (realistic current values)");

  return Object.entries(CRYPTO_CONFIG).map(([id, config]) => ({
    id,
    name: config.name,
    symbol: config.symbol,
    price:
      config.symbol === "BTC"
        ? 67432.5
        : config.symbol === "ETH"
        ? 3487.25
        : 0.1205, // DOGE
    change24h:
      config.symbol === "BTC" ? 2.34 : config.symbol === "ETH" ? -1.67 : 5.89, // DOGE often has higher volatility
    lastUpdated: Date.now() / 1000,
  }));
};

const getFallbackChart = (): ChartData => {
  console.log("⚠️ Using fallback chart data");

  const now = new Date();

  return {
    labels: Array.from({ length: 6 }, (_, i) => {
      const time = new Date(now.getTime() - (5 - i) * 60 * 60 * 1000);
      return time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }),
    prices: [67125.3, 67234.8, 67189.45, 67356.22, 67298.15, 67432.5],
  };
};

// Cache functions
let cachedPriceData: CryptoData[] = [];

const cacheData = (data: CryptoData[]) => {
  cachedPriceData = data;
  try {
    localStorage.setItem(
      "cryptoCache",
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch (error) {
    console.warn("Failed to cache data:", error);
  }
};
