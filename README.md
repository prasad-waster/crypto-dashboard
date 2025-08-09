# 🚀 Crypto Dashboard – Real-Time Cryptocurrency Tracker

A responsive **cryptocurrency dashboard** built with **React (TypeScript)**, styled using **Tailwind CSS**, featuring real-time price updates from the **Binance Public API**, and an interactive **Bitcoin price chart** powered by **Chart.js**.

Live Deployment: [Click Here to View](https://crypto-dashboard-prasad-waster.netlify.app/)

---

## ✨ Features

- 📊 **Live crypto prices** for **Bitcoin (BTC)**, **Ethereum (ETH)**, and **Dogecoin (DOGE)**
- 🔄 **Auto-refresh every 60 seconds**
- 📈 **Bitcoin last 6 hours price trend chart**
- 🟢 **24h price change indicators** (green for positive, red for negative)
- 📱 Fully **responsive** for mobile, tablet, and desktop
- ⚡ **Fast, lightweight, and modern UI**

---

## 🛠 Tech Stack

- **React** (with TypeScript)
- **Tailwind CSS** (for styling)
- **Chart.js** (via react-chartjs-2)
- **Binance API** (real-time cryptocurrency data)
- **Node.js & npm** (environment & package manager)

---

## 📦 Installation & Setup

Clone and install dependencies:
git clone https://github.com/prasad-waster/crypto-dashboard.git
cd crypto-dashboard
npm install

text

Run development server:
npm start

text
App will be available at:  
`http://localhost:3000`

---

## 🚀 Build for Production

npm run build

text
This generates an optimized build inside the `/build` folder.

---

## 📊 API Used

We use **Binance's Public API** for real-time prices & candlestick data:

- Prices endpoint: `https://api.binance.com/api/v3/ticker/24hr`
- Chart data endpoint: `https://api.binance.com/api/v3/klines`

No API key required, reliable and fast for assignment/demo purposes.

---

## 📂 Project Structure

---
crypto-dashboard/
│
├── src/                               # Main source code
│   ├── components/                    # UI components
│   │   ├── Dashboard.tsx               # Main dashboard layout
│   │   ├── CryptoCard.tsx              # Reusable crypto price card
│   │   └── PriceChart.tsx              # Bitcoin price trend chart
│   │
│   ├── services/                       # API service logic
│   │   └── cryptoAPI.ts                 # Binance API integration functions
│   │
│   ├── types/                          # TypeScript type definitions
│   │   └── index.ts                     # Type interfaces
│   │
│   ├── App.tsx                         # Root app component
│   ├── index.tsx                       # Application entry point (ReactDOM render)
│   └── index.css                       # Global styles (if any)
│
├── public/                             # Public assets
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
│
├── tailwind.config.js                  # Tailwind CSS configuration
├── tsconfig.json                       # TypeScript configuration
├── package.json                        # Project dependencies & scripts
├── postcss.config.js                   # PostCSS configuration for Tailwind
├── README.md                           # Project documentation
└── yarn.lock / package-lock.json       # Dependency lock file

---

## ✍ Author

**Prasad Waster** – Full-Stack Developer  
Email: prasadwaster@example.com  
GitHub: [Your GitHub Profile](https://github.com/prasad-waster)

---

## 📜 License

This project is licensed under the MIT License.
