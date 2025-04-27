// import React, { useState } from "react";
// import CategoryList from '../components/CategoryList';
// import CarSearch from '../components/CarSearch';
// import PartList from '../components/PartList';

// const ProductListing = () => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [carFilters, setCarFilters] = useState({ make: '', model: '', year: '' });

//   const handleSearch = (filters) => {
//     setSelectedCategory(null);
//     setCarFilters(filters);
//   };

//   return (
//     <div className="w-full font-sans">
//       {/* Search Bar */}
//       <div className="flex justify-center my-6">
//         <CarSearch onSearch={handleSearch} />
//       </div>

//       {/* Centered Category & PartList */}
//       <div className="flex justify-center">
//         <div className="flex gap-6 w-full max-w-6xl">
//           {/* Sidebar */}
//           <div className="w-[30%]">
//             <CategoryList
//               onCategorySelect={(cat) => {
//                 setCarFilters({ make: '', model: '', year: '' });
//                 setSelectedCategory(cat);
//               }}
//             />
//           </div>

//           {/* Parts Display */}
//           <div className="w-[70%]">
//             <PartList category={selectedCategory} carFilters={carFilters} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductListing;




import React, { useState } from "react";
import CategoryList from '../components/CategoryList';
import CarSearch from '../components/CarSearch';
import PartList from '../components/PartList';
import './ProductListing.css'; // Import your CSS file for styling

const ProductListing = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [carFilters, setCarFilters] = useState({ make: '', model: '', year: '' });
  // const [sortOption, setSortOption] = useState('price-asc');  // Default sort: price ascending

  const handleSearch = (filters) => {
    setSelectedCategory(null);
    setCarFilters(filters);
  };



  return (
    <div className="w-full font-sans">
      {/* Search Bar */}
      <div className="flex justify-center my-6">
        <CarSearch className='car-search' onSearch={handleSearch} />
      </div>



      {/* Centered Category & PartList */}
      <div className="flex justify-center">
        <div className="flex gap-6 w-full max-w-6xl">
          {/* Sidebar */}
          <div className="w-[30%]">
            <CategoryList className="category-list"
              onCategorySelect={(cat) => {
                setCarFilters({ make: '', model: '', year: '' });
                setSelectedCategory(cat);
              }}
            />
          </div>

          {/* Parts Display */}
          <div className="w-[70%]">
            <PartList
              category={selectedCategory} 
              carFilters={carFilters} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;

