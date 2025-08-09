import React from "react";
import { CryptoData } from "../types";

interface Props {
  data: CryptoData;
}

const CryptoCard: React.FC<Props> = ({ data }) => {
  const { name, symbol, price, change24h } = data;
  const isPositive = change24h >= 0;

  // Safe price formatting function
  const formatPrice = (price: number, symbol: string): string => {
    if (!price || isNaN(price)) return "$0.00";

    try {
      if (symbol === "BTC") {
        // Bitcoin: no decimal places
        return price
          .toLocaleString(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
            style: "currency",
            currency: "USD",
          })
          .replace("$", "$");
      } else if (price >= 1) {
        // For prices >= $1: show 2-4 decimal places
        return price
          .toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 4,
            style: "currency",
            currency: "USD",
          })
          .replace("$", "$");
      } else if (price >= 0.01) {
        // For prices >= $0.01: show 4 decimal places
        return price
          .toLocaleString(undefined, {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4,
            style: "currency",
            currency: "USD",
          })
          .replace("$", "$");
      } else {
        // For very small prices: use fixed notation with 6 decimal places
        return `$${price.toFixed(6)}`;
      }
    } catch (error) {
      // Fallback formatting
      console.warn("Price formatting error:", error);
      return `$${price.toString()}`;
    }
  };

  // Safe change formatting
  const formatChange = (change: number): string => {
    if (!change || isNaN(change)) return "0.00";
    return Math.abs(change).toFixed(2);
  };

  return (
    <div className="bg-crypto-blue rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <p className="text-gray-400 uppercase text-sm">{symbol}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            {formatPrice(price, symbol)}
          </div>
          <div
            className={`text-sm font-medium flex items-center justify-end mt-1 ${
              isPositive ? "text-crypto-green" : "text-crypto-red"
            }`}
          >
            <span className="mr-1">{isPositive ? "▲" : "▼"}</span>
            {formatChange(change24h)}%
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            isPositive ? "bg-crypto-green" : "bg-crypto-red"
          }`}
          style={{
            width: `${Math.min(Math.abs(change24h || 0) * 10, 100)}%`,
          }}
        ></div>
      </div>

      <p className="text-xs text-gray-400">24h Change</p>
    </div>
  );
};

export default CryptoCard;
