import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// PaymentInfo Component
const PaymentInfo = ({ cards, onCardSelect, onNewCard }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const handleAddNewCard = () => {
    // Navigate to the account settings page to add a new card
    navigate("/accsetting");
  };

  const handleSelectCard = (card) => {
    setSelectedCard(card);
    onCardSelect(card);
  };

  return (
    <div className="section p-6 rounded-lg shadow-lg max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-white">Payment Information</h2>

      {/* Choose Payment Card Section */}
      <div>
        <h3 className="text-lg font-medium text-white mb-3">Choose a Payment Card</h3>
        {cards.length > 0 ? (
          <select
            onChange={(e) => handleSelectCard(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option className="text-white bg-gray-900" value="">Select Existing Card</option>
            {cards.map((card, index) => (
              <option className="text-white bg-gray-900" key={index} value={card}>
                {card}
              </option>
            ))}
          </select>
        ) : (
          <p className="text-white mt-2">No cards available. Please add a new one.</p>
        )}
      </div>

      {/* Add New Card Section */}
      <div className="flex justify-center">
        <button
          onClick={handleAddNewCard}
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          Add New Card
        </button>
      </div>

      {/* Selected Card Section */}
      {selectedCard && (
        <div className="border-t border-gray-300 pt-4">
          <h4 className="text-lg font-medium text-white">Selected Card:</h4>
          <p className="text-text-white">{selectedCard}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentInfo;
