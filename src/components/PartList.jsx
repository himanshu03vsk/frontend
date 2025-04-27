// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const PartList = ({ category, carFilters }) => {
//   const [parts, setParts] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const _ = Math.floor(Math.random() * 3) + 1


//   const buildApiUrl = () => {
//     if (category) {
//       return `http://localhost:3000/api/parts/by-category?category=${encodeURIComponent(category)}`;
//     } else if (carFilters.make || carFilters.model || carFilters.year) {
//       const queryParams = new URLSearchParams({
//         make: carFilters.make,
//         model: carFilters.model,
//         year: carFilters.year,
//       }).toString();
//       return `http://localhost:3000/api/parts-of-cars/search?${queryParams}`;
//     }
//     return null;
//   };

//   useEffect(() => {
//     const fetchParts = async () => {
//       setLoading(true);
//       setError('');
//       let url = buildApiUrl();
//       if (!url) url = 'http://localhost:3000/api/parts/catelogue';

//       try {
//         const res = await fetch(url);
//         if (!res.ok) throw new Error(`API Error: ${res.status}`);
//         const data = await res.json();
//         setParts(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchParts();
//   }, [category, carFilters]);

//   return (
//     <div className="p-5 font-sans mx-auto">
//       {error && <p className="text-red-600 font-bold text-center text-lg">{error}</p>}
//       {loading ? (
//         <p className="text-center text-gray-500 text-lg">Loading...</p>
//       ) : (
//         <div className="flex flex-col gap-5 max-h-[600px] pr-2 overflow-y-auto">
//           {parts.length > 0 ? (
//             parts.map((part) => (
//               <div
//                 key={part.part_id}
//                 className="flex justify-between items-center gap-4 p-4 rounded-lg bg-gray-300 text-gray-800"
//               >
//                 <img
//                   src={`/public/images/${part.part_type} ${_}.jpg`}
//                   alt={part.part_type}
//                   className="w-[150px] h-[150px] object-cover rounded"
//                 />
//                 <div className="flex-1">
//                   <h3 className="text-xl font-semibold mb-1">{part.part_type}</h3>
//                   <p><strong>Price:</strong> ${part.price}</p>
//                   <p>
//                     <strong>Car:</strong>{' '}
//                     {part.car_year ? ` ${part.car_year}` : ''}{' '}
//                     {[part.make, part.model].filter(Boolean).join(' ')}
//                   </p>
//                 </div>
//                 <div className="ml-4 self-center">
//                   <button
//                     onClick={() => navigate(`/proddetail/${part.part_id}`)}
//                     className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No parts found.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default PartList;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const PartList = ({ category, carFilters }) => {
//   const [parts, setParts] = useState([]);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [sortOption, setSortOption] = useState('price-asc'); // New state for sorting
//   const navigate = useNavigate();

//   // Randomly selecting an image number
//   const getRandomImageIndex = () => Math.floor(Math.random() * 3) + 1;

//   const buildApiUrl = () => {
//     if (category) {
//       return `http://localhost:3000/api/parts/by-category?category=${encodeURIComponent(category)}`;
//     } else if (carFilters.make || carFilters.model || carFilters.year) {
//       const queryParams = new URLSearchParams({
//         make: carFilters.make,
//         model: carFilters.model,
//         year: carFilters.year,
//       }).toString();
//       return `http://localhost:3000/api/parts-of-cars/search?${queryParams}`;
//     }
//     return null;
//   };

//   useEffect(() => {
//     const fetchParts = async () => {
//       setLoading(true);
//       setError('');
//       let url = buildApiUrl();
//       if (!url) url = 'http://localhost:3000/api/parts/catelogue';

//       try {
//         const res = await fetch(url);
//         if (!res.ok) throw new Error(`API Error: ${res.status}`);
//         const data = await res.json();
//         setParts(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchParts();
//   }, [category, carFilters]);

//   // Sorting function based on selected option
//   const sortParts = (parts) => {
//     switch (sortOption) {
//       case 'price-asc':
//         return parts.sort((a, b) => a.price - b.price); // Ascending price
//       case 'price-desc':
//         return parts.sort((a, b) => b.price - a.price); // Descending price
//       case 'name-asc':
//         return parts.sort((a, b) => a.part_type.localeCompare(b.part_type)); // Ascending name
//       case 'name-desc':
//         return parts.sort((a, b) => b.part_type.localeCompare(a.part_type)); // Descending name
//       default:
//         return parts;
//     }
//   };

//   // Handle sorting option change
//   const handleSortChange = (e) => {
//     setSortOption(e.target.value);
//   };

//   // Sort the parts before rendering
//   const sortedParts = sortParts(parts);

//   return (
//     <div className="p-5 font-sans mx-auto">
//       {error && <p className="text-red-600 font-bold text-center text-lg">{error}</p>}
//       {loading ? (
//         <div className="flex justify-center items-center">
//           <div className="spinner-border animate-spin rounded-full w-8 h-8 border-t-2 border-b-2 border-gray-800"></div>
//           <p className="text-center text-gray-500 text-lg ml-4">Loading...</p>
//         </div>
//       ) : (
//         <div>
//           {/* Sorting Dropdown */}
//           <div className="mb-4 flex justify-end">
//             <select
//               value={sortOption}
//               onChange={handleSortChange}
//               className="px-4 py-2 border border-gray-300 rounded"
//             >
//               <option value="price-asc">Price: Low to High</option>
//               <option value="price-desc">Price: High to Low</option>
//               <option value="name-asc">Name: A to Z</option>
//               <option value="name-desc">Name: Z to A</option>
//             </select>
//           </div>

//           {/* Parts List */}
//           <div className="flex flex-col gap-5 max-h-[600px] pr-2 overflow-y-auto">
//             {sortedParts.length > 0 ? (
//               sortedParts.map((part) => (
//                 <div
//                   key={`${part.part_id}-${part.color}`}
//                   className="flex justify-between items-center gap-4 p-4 rounded-lg bg-gray-300 text-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
//                 >
//                   {/* Part Image */}
//                   <img
//                     src={`/public/images/${part.part_type} ${getRandomImageIndex()}.jpg`}
//                     alt={part.part_type}
//                     className="w-[150px] h-[150px] object-cover rounded"
//                   />

//                   {/* Part Information */}
//                   <div className="flex-1">
//                     <h3 className="text-xl font-semibold mb-1">{part.part_type}</h3>
//                     <p><strong>Price:</strong> ${part.price}</p>
//                     <p>
//                       <strong>Car:</strong>{' '}
//                       {part.car_year ? ` ${part.car_year}` : ''}{' '}
//                       {[part.make, part.model].filter(Boolean).join(' ')}
//                     </p>
//                   </div>

//                   {/* View Details Button */}
//                   <div className="ml-4 self-center">
//                     <button
//                       onClick={() => navigate(`/proddetail/${part.part_id}`)}
//                       className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors duration-300"
//                     >
//                       View Details
//                     </button>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-lg text-gray-500">No parts found.</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PartList;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PartList = ({ category, carFilters }) => {
  const [parts, setParts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState('price-asc'); // New state for sorting
  const navigate = useNavigate();

  // Randomly selecting an image number
  const getRandomImageIndex = () => Math.floor(Math.random() * 3) + 1;

  const buildApiUrl = () => {
    if (category) {
      return `http://localhost:3000/api/parts/by-category?category=${encodeURIComponent(category)}`;
    } else if (carFilters.make || carFilters.model || carFilters.year) {
      const queryParams = new URLSearchParams({
        make: carFilters.make,
        model: carFilters.model,
        year: carFilters.year,
      }).toString();
      return `http://localhost:3000/api/parts-of-cars/search?${queryParams}`;
    }
    return null;
  };

  useEffect(() => {
    const fetchParts = async () => {
      setLoading(true);
      setError('');
      let url = buildApiUrl();
      if (!url) url = 'http://localhost:3000/api/parts/catelogue';

      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        const data = await res.json();
        setParts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchParts();
  }, [category, carFilters]);

  // Sorting function based on selected option
  const sortParts = (parts) => {
    switch (sortOption) {
      case 'price-asc':
        return parts.sort((a, b) => a.price - b.price); // Ascending price
      case 'price-desc':
        return parts.sort((a, b) => b.price - a.price); // Descending price
      case 'name-asc':
        return parts.sort((a, b) => a.part_type.localeCompare(b.part_type)); // Ascending name
      case 'name-desc':
        return parts.sort((a, b) => b.part_type.localeCompare(a.part_type)); // Descending name
      default:
        return parts;
    }
  };

  // Handle sorting option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Sort the parts before rendering
  const sortedParts = sortParts(parts);

  return (
    <div className="p-5 font-sans mx-auto">
      {error && <p className="text-red-600 font-bold text-center text-lg">{error}</p>}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="spinner-border animate-spin rounded-full w-8 h-8 border-t-2 border-b-2 border-gray-800"></div>
          <p className="text-center text-gray-500 text-lg ml-4">Loading...</p>
        </div>
      ) : (
        <div>
          {/* Sorting Dropdown */}
          <div className="mb-4 flex justify-end">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="px-4 py-2 border border-gray-300 rounded"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          {/* Parts List */}
          <div className="flex flex-col gap-5 max-h-[600px] pr-2 overflow-y-auto">
            {sortedParts.length > 0 ? (
              sortedParts.map((part) => (
                <div
                  key={`${part.part_id}-${part.color}`}
                  className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 rounded-lg bg-gray-300 text-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Part Image */}
                  <img
                    src={`/public/images/${part.part_type} ${getRandomImageIndex()}.jpg`}
                    alt={part.part_type}
                    className="w-full sm:w-[150px] h-auto sm:h-[150px] object-cover rounded mb-4 sm:mb-0"
                  />

                  {/* Part Information */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{part.part_type}</h3>
                    <p><strong>Price:</strong> ${part.price}</p>
                    <p>
                      <strong>Car:</strong>{' '}
                      {part.car_year ? ` ${part.car_year}` : ''}{' '}
                      {[part.make, part.model].filter(Boolean).join(' ')}
                    </p>
                  </div>

                  {/* View Details Button */}
                  <div className="ml-4 self-center">
                    <button
                      onClick={() => navigate(`/proddetail/${part.part_id}`)}
                      className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-lg text-gray-500">No parts found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PartList;
