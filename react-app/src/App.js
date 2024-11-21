import React, { useState, useEffect } from 'react';
import { AlertTriangle, Database, RefreshCw } from 'lucide-react';

const SAPDashboard = () => {
  // State management for data and loading
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from a free API (in this case, JSONPlaceholder)
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result.slice(0, 10)); // Limit to 10 items for dashboard
      setError(null);
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <RefreshCw className="animate-spin w-12 h-12 text-blue-500" />
          <p className="mt-4 text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <div className="text-center p-8 rounded-lg bg-white shadow-lg">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-700 mb-2">Data Fetch Error</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={fetchData} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Retry Fetch
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <Database className="mr-3 text-blue-500" /> 
          SAP Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Displaying analytical data from JSONPlaceholder API</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div 
            key={item.id} 
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {item.title}
            </h3>
            <p className="text-gray-600">
              {item.body.length > 100 ? item.body.substring(0, 100) + '...' : item.body}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-blue-500">Post ID: {item.id}</span>
              <span className="text-sm text-gray-500">User ID: {item.userId}</span>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-8 text-center text-gray-500">
        <button 
          onClick={fetchData} 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Refresh Data
        </button>
      </footer>
    </div>
  );
};

export default SAPDashboard;