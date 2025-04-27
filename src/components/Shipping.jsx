import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShippingInfo = ({ addresses, onAddressSelect, onNewAddress }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigate = useNavigate();

  const handleAddNewAddress = () => {
    navigate("/accsetting"); // Navigate to account settings to add a new address
  };

  // Handle the selection of an address from the dropdown
  const handleSelectAddress = (e) => {
    const address = JSON.parse(e.target.value); // parse the JSON string back into an object
    setSelectedAddress(address);
    onAddressSelect(address);
  };

  return (
    <div className="bg-gray-500 section p-6 rounded-lg shadow-lg max-w-xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-white">Shipping Information</h2>
      
      {/* Choose Shipping Address Section */}
      <div>
        <h3 className="text-lg font-medium text-white mb-3">Choose a Shipping Address</h3>
        {addresses.length > 0 ? (
          <select
            onChange={handleSelectAddress}
            className="w-full border border-gray-300 rounded-md py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option className="text-white bg-gray-900" value="">Select Existing Address</option>
            {addresses.map((address, index) => (
              <option className="text-white bg-gray-900" key={index} value={JSON.stringify(address)}>
                {address.line1}, {address.city}, {address.state_in}, {address.zip_code}
              </option>
            ))}
          </select>
        ) : (
          <p className="text-gray-600 mt-2">No addresses available. Please add a new one.</p>
        )}
      </div>

      {/* Add New Address Section */}
      <div className="flex justify-center">
        <button
          onClick={handleAddNewAddress}
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          Add New Address
        </button>
      </div>

      {/* Selected Address Section */}
      {selectedAddress && (
        <div className="border-t border-gray-300 pt-4">
          <h4 className="text-lg font-medium text-white">Selected Address:</h4>
          <p className="text-white">
            {selectedAddress.line1}, {selectedAddress.line2}, {selectedAddress.city}, {selectedAddress.state_in} {selectedAddress.zip_code}
          </p>
        </div>
      )}
    </div>
  );
};

export default ShippingInfo;
