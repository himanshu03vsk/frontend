import React, { useEffect, useState } from 'react';

const ProductDescription = ({ part }) => {
  const [part_car_details, setPart_car_details] = useState([]);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/parts-of-cars/category/?part_id=${part.part_id}`);
        const data = await response.json();
        setPart_car_details(data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [part.part_id]);

  return (
    <div className="section prod-desc-container max-w-4xl mx-auto p-6 bg-black text-white rounded-lg shadow-lg">
      <div className="desc prod-title mb-4">
        <p className="text-2xl font-semibold">{part.part_type}</p>
      </div>

      <div className="desc prod-stock mb-4">
        <p className="text-xl text-green-400">In Stock</p>
      </div>

      <div className="desc prod-price mb-4">
        <p className="text-2xl font-bold">${part.price}</p>
      </div>

      <div className="desc prod-desc mb-4">
        <p className="text-sm">{part.part_description}</p>
      </div>

      <div className="desc prod-dim mb-4">
        <p className="text-sm">Dimensions: {part.dimensions}</p>
      </div>

      <div className="desc prod-weight mb-4">
        <p className="text-sm">Weight: {part.part_weight} lbs</p>
      </div>

      <div className="desc prod-type mb-4">
        <p className="text-sm">Type: {part.part_type}</p>
      </div>

      <div className="desc prod-category mb-4">
        <p className="text-sm">Category: {part.part_category}</p>
      </div>

      <div className="desc prod-car-details mb-4">
        <p className="text-lg font-semibold">For Cars:</p>
      </div>

      <div className="desc prod-car-details-list flex flex-row gap-2 space-y-2">
        {part_car_details.map((car, index) => (
          <p key={index} className="text-sm text-gray-300">
            {car.make} {car.model} {car.car_year}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProductDescription;
