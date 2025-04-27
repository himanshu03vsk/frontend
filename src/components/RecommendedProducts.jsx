import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InstantSearch, connectHits , Configure } from 'react-instantsearch-dom';
import { algoliasearch } from 'algoliasearch';
import './RecommendedProducts.css' ;
const searchClient = algoliasearch('7G59D8167N', '1a755d15880cfbc8269093d24e24b422');

// Component to render each product card
const ProductHit = ({ hit }) => {
  const imageFileName = hit.name;
  const imagePath = `/images/${imageFileName} 1.jpg`;
  console.log('Image path:', imagePath);
  return (
    <Link to={`/proddetail/${hit.objectID}`} className="w-[250px] h-[350px] bg-white rounded shadow p-4 mx-2 flex-shrink-0 flex flex-col justify-between">
      <img
        src={imagePath}
        alt={hit.name}
        className="w-full h-40 object-cover rounded mb-3"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/Alternator 1.jpg';
        }}
      />
      <div className="flex flex-col gap-1">
        <h4 className="text-xl font-bold truncate">{hit.name}</h4>
        <p className="text-gray-600 text-sm">{hit.category}</p>
        <p className="text-sm text-gray-500">${hit.price}</p>
      </div>
    </Link>
  );
};

// Connected hits to customize horizontal layout
const CustomHits = ({ hits }) => (
  <div className="flex overflow-x-auto no-scrollbar px-2">
    {hits.map((hit) => (
      <ProductHit key={hit.objectID} hit={hit} />
    ))}
  </div>
);
const ConnectedHits = connectHits(CustomHits);

// Main RecommendedProducts component
const RecommendedProducts = () => {
  return (
    <div className="mt-12 w-full max-w-7xl mx-auto px-6">
      <h3 className="text-2xl font-semibold mb-4">Recommended for You</h3>
      <InstantSearch searchClient={searchClient} indexName="products">
        <Configure hitsPerPage={10} />
        <div className='text-black p-4 rounded scorllable'>
        <ConnectedHits />
        </div>
      </InstantSearch>
    </div>
  );
};

export default RecommendedProducts;
