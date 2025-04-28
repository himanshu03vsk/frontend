import React, { useEffect, useState } from 'react';
import './categorylist.css'; // Import your CSS file for styling
const CategoryList = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://backend-carshop.onrender.com/api/parts/categoryList', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(`API error: ${res.status} ${errText}`);
        }

        const data = await res.json();
        console.log('Fetched categories:', data);

        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        console.error('Error fetching categories:', err.message);
        setError(err.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="text-center font-sans">
      <h2 className="text-2xl font-semibold mb-4">Car Part Categories</h2>
      {error && <p className="text-red-600 font-medium">{error}</p>}

      <ul className="max-w-sm mx-auto border border-gray-300 rounded overflow-hidden">
        {categories.length > 0 ? (
          categories.map((cat, index) => (
            <li
              key={index}
              onClick={() => onCategorySelect(cat)}
              className="category-list-item px-4 py-3 bg-gray-700 text-white border-b border-gray-600 hover:bg-gray-600 cursor-pointer transition-colors"
            >
              {cat}
            </li>
          ))
        ) : (
          !error && <li className="px-4 py-3 text-gray-500">Loading...</li>
        )}
      </ul>
    </div>
  );
};

export default CategoryList;
