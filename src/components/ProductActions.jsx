import React, { useState, useEffect } from 'react';

const ProductActions = ({ product }) => {
  const [quantity, setQuantity] = useState(1); // Quantity is updated via input
  const [colors, setColors] = useState([]); // Colors are used in the dropdown
  const [selectedColor, setSelectedColor] = useState('');  // State for the selected color
  const [buttonState, setButtonState] = useState('Add to Cart'); // State for the button

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Make sure you send the correct product ID or product object
        const response = await fetch(`http://backend-carshop.onrender.com/api/parts/color/${product}`);
        const data = await response.json();
        // console.log(data);

        // Assuming the API returns an array of colors like { color: 'Black' }
        setColors(data.colors || []);  // Set the colors to state

        // Optionally set the default color if it's available
        if (data.colors && data.colors.length > 0) {
          setColors(data.colors);
          setSelectedColor(data.colors[0].color);
        } else {
          // If no colors are available, use a generic default option
          setColors([{ color: 'Generic' }]);
          setSelectedColor('Generic');
        }
        
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    fetchProductDetails();
  }, [product]);  // Re-run the effect when the `product` changes

  // Function to handle adding the product to the cart
  const handleAddToCart = () => { // Function is invoked on button click
    if (selectedColor && quantity > 0) {
      // Make an API call to add the product to the cart
      const updateCart = async () => {
        const buyer_email = JSON.parse(localStorage.getItem('user')).email; // Extract email from user object
        console.log('Adding to cart:', {
          part_id: product,
          color: selectedColor,
          quantity: quantity,
          buyer_email: buyer_email,  // Use extracted email
        });
        try {
          const response = await fetch(`http://backend-carshop.onrender.com/api/carts/${buyer_email}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${localStorage.getItem('token')}`,  // Include token for authentication
            },
            body: JSON.stringify({
              buyer_email: buyer_email,  // Get the email from local storage
              part_id: product,
              color: selectedColor,
              quantity: quantity,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to add product to cart');
          }

          const result = await response.json();
          console.log('Cart updated successfully:', result);
        } catch (err) {
          console.error('Error updating or creating cart:', err);
        }
      };

      updateCart();
      console.log(`Added ${quantity} of ${selectedColor} to the cart.`);
      setButtonState('Added to Cart');
      
      // Disable the button temporarily
      document.querySelector('.crt-btn').disabled = true;
      // Add logic to actually add the product to the cart (e.g., storing in localStorage or redux)
    } else {
      console.log('Please select a color');
    }
  };

  return (
    <div className="prod-actions mt-4">
      <div className="act-btn">
        {/* Color selection dropdown */}
        <label htmlFor="color-select">Select Color:</label>
        <select className='bg-black text-white'
        id="color-select"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
        >
              {colors.map((color, index) => (
              <option className='bg-black' key={index} value={color.color}>
              {color.color}
        </option>
  ))}
</select>
      </div>

      <div className="act-btn my-5 py-2 px-4 rounded-lg bg-black text-white text-white border-2 border-gray-600 hover:bg-white hover:border-gray-700 hover:text-black focus:ring-2 focus:ring-gray-500 transition-all duration-300">
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          min="1"
          max="5"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}  // Update quantity
          className="product-action-input"
        />
      </div>

      <button className="act-btn crt-btn flex-1 my-5 py-2 px-4 rounded-lg bg-black text-white border-2 border-gray-600 hover:bg-white hover:border-gray-700 hover:text-black focus:ring-2 focus:ring-gray-500 transition-all duration-300" onClick={handleAddToCart}>
        {buttonState}
      </button>
    </div>
  );
};

export default ProductActions;
