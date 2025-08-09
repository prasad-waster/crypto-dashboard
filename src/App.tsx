import React from 'react';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-crypto-dark">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Crypto Dashboard
          </h1>
          <p className="text-gray-300">
            Live cryptocurrency prices and trends
          </p>
        </header>
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
