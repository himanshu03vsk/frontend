import React, { useState } from 'react';
import axios from 'axios'; // We use Axios for making HTTP requests

const NewPayment = () => {
  // State variables to hold the form data
  const [cardNo, setCardNo] = useState('');
  const [cardExpDate, setCardExpDate] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardAddress, setCardAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset error and success messages
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate form data
    if (!cardNo || !cardExpDate || !cardCVV || !cardName || !cardAddress) {
      setError('Please fill all the fields');
      setLoading(false);
      return;
    }

    // Prepare payment data to send to the backend
    const buyerEmail = JSON.parse(localStorage.getItem('user')).email; // Get the buyer email from local storage
    const paymentData = {
      buyer_email: buyerEmail,  // Use the passed buyerEmail prop
      card_no: cardNo,
      card_exp_date: cardExpDate,
      card_cvv: cardCVV,
      card_name: cardName,
      card_address: cardAddress,
    };

    try {
      // Send payment data to the backend using POST request
      
      const response = await axios.post('https://backend-carshop.onrender.com/api/payments/create', paymentData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status !== 201) {
        throw new Error('Failed to add payment method');
      }

        // Handle successful response
        const { method_no } = response.data; // Extract method number from response
        console.log('Payment method added successfully:', method_no);
        setSuccess(`Payment method added successfully! Method No: ${method_no}`);


      
      // Handle successful payment submission
      setSuccess('Payment method added successfully!');
      setLoading(false);
    } catch (error) {
      // Handle error
      setError('Failed to add payment method. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="payment-form-container section mt-10 ml-10 px-5 py-5 rounded-lg shadow-md bg-gray-500 mt-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Payment Method</h2>

      {/* Error and Success Messages */}
      {error && <p className="text-red-600 font-medium">{error}</p>}
      {success && <p className="text-green-600 font-medium">{success}</p>}

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <input
            type="text"
            value={cardNo}
            onChange={(e) => setCardNo(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="1234 5678 9876 5432"
            maxLength="16"
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Expiration Date</label>
            <input
              type="month"
              value={cardExpDate}
              placeholder='YYYY-MM'
              onChange={(e) => setCardExpDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">CVV</label>
            <input
              type="text"
              value={cardCVV}
              onChange={(e) => setCardCVV(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="123"
              maxLength="3"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cardholder Name</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Billing Address</label>
          <textarea
            value={cardAddress}
            onChange={(e) => setCardAddress(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="1234 Main St, City, Country"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className={`bg-blue-600 text-white px-6 py-3 rounded-lg ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Add Payment Method'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPayment;
