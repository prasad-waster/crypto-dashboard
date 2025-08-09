import React, { useState, useEffect, useCallback } from "react";
import CryptoCard from "./CryptoCard";
import PriceChart from "./PriceChart";
import { CryptoData, ChartData } from "../types";
import { fetchCryptoPrices, fetchBitcoinChart } from "../services/cryptoAPI";

const Dashboard: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching crypto data...");
      const prices = await fetchCryptoPrices();
      setCryptoData(prices);

      console.log("Fetching chart data...");
      const chart = await fetchBitcoinChart();
      setChartData(chart);

      setLastUpdated(new Date());
      console.log("Data fetch successful");
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Using cached/fallback data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading && cryptoData.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-crypto-green mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading cryptocurrency data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Error Banner */}
      {error && (
        <div className="bg-yellow-900 border border-yellow-600 text-yellow-200 px-4 py-3 rounded">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cryptoData.map((crypto) => (
          <CryptoCard key={crypto.id} data={crypto} />
        ))}
      </div>

      {/* Bitcoin Chart */}
      {chartData && (
        <div className="bg-crypto-blue rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">
            Bitcoin Price Trend (Last 6 Hours)
          </h2>
          <PriceChart data={chartData} />
        </div>
      )}

      <div className="text-center text-gray-400 text-sm">
        Last updated: {lastUpdated.toLocaleTimeString()}
        <div className="mt-1">
          <span
            className={`inline-block w-2 h-2 rounded-full mr-2 ${
              loading
                ? "bg-yellow-500 animate-pulse"
                : error
                ? "bg-red-500"
                : "bg-crypto-green"
            }`}
          ></span>
          {loading ? "Updating..." : error ? "Using cached data" : "Live"}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
