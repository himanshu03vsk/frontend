import React, { useState } from 'react';
import './carsearch.css'; // Import your CSS file for styling

const CarSearch = ({ onSearch }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ make, model, year });
  };

  return (
    <div className="car-search-container p-8 w-full max-w-6xl mx-auto font-sans">
      <h2 className="text-center text-2xl font-semibold mb-6">Search Car Parts</h2>

      <form
        onSubmit={handleSearch}
        className="w-full p-6 rounded-lg"
      >
        <div className="car-search-items flex flex-wrap items-center justify-center gap-4 overflow-x-auto">
          <input
            type="text"
            placeholder="Make (e.g. Toyota)"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="input-field p-2 border border-gray-300 rounded w-full sm:w-[200px] text-sm"
          />
          <input
            type="text"
            placeholder="Model (e.g. Corolla)"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="input-field p-2 border border-gray-300 rounded w-full sm:w-[200px] text-sm"
          />
          <input
            type="number"
            placeholder="Year (e.g. 2020)"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="input-field p-2 border border-gray-300 rounded w-full sm:w-[140px] text-sm"
          />
          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarSearch;
