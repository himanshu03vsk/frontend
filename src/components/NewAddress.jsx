import React, { useState } from "react";

const NewAddress = () => {
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state_in: "",
    zip_code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  const buyerEmail = JSON.parse(localStorage.getItem('user')).email

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    // Assuming you have an API endpoint to add the address
    try {
      const response = await fetch("http://localhost:3000/api/buyer-addresses/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          buyer_email: buyerEmail,
          ...address,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add address");
      }

      const data = await response.json();
      alert(data.message);
      setAddress({
        line1: "",
        line2: "",
        city: "",
        state_in: "",
        zip_code: "",
      }); // Reset form
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div className="payment-form-container section mt-10 ml-10 px-5 py-5 rounded-lg shadow-md bg-gray-500 mt-8">
      <h2 className="text-xl font-semibold mb-4">Add Your Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="line1"
          placeholder="Address Line 1"
          value={address.line1}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="line2"
          placeholder="Address Line 2"
          value={address.line2}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="state_in"
          placeholder="State"
          value={address.state_in}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          name="zip_code"
          placeholder="Zip Code"
          value={address.zip_code}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-400"
        >
          Add Address
        </button>
      </form>
    </div>
  );
};

export default NewAddress;
