import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChartData } from "../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Props {
  data: ChartData;
}

const PriceChart: React.FC<Props> = ({ data }) => {
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(22, 33, 62, 0.9)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#00d4aa",
        borderWidth: 1,
        callbacks: {
          label: (context) => {
            return `Price: $${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#9ca3af",
        },
      },
      y: {
        display: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#9ca3af",
          callback: function (value) {
            return "$" + value.toLocaleString();
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 3,
        hoverRadius: 6,
      },
    },
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Bitcoin Price",
        data: data.prices,
        borderColor: "#00d4aa",
        backgroundColor: "rgba(0, 212, 170, 0.1)",
        borderWidth: 2,
        fill: true,
        pointBackgroundColor: "#00d4aa",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointHoverBackgroundColor: "#ffffff",
        pointHoverBorderColor: "#00d4aa",
      },
    ],
  };

  return (
    <div style={{ height: "400px" }}>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default PriceChart;
