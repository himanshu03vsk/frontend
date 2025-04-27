import React, { useState, useEffect } from "react";
import './cart.css';

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [quantities, setQuantities] = useState({});
    const [saving, setSaving] = useState({});  // New state to manage saving status

    const getKey = (item) => `${item.part_id}_${item.color}`;

    useEffect(() => {
        const fetchCartItems = async () => {
            const buyer_email = JSON.parse(localStorage.getItem('user')).email;
            try {
                const response = await fetch(`http://localhost:3000/api/carts/${buyer_email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (!response.ok) throw new Error('Failed to fetch cart items');

                const data = await response.json();

                const enrichedItems = await Promise.all(
                    data.map(async (item) => {
                        const partRes = await fetch(`http://localhost:3000/api/parts/${item.part_id}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                authorization: `Bearer ${localStorage.getItem('token')}`,
                            },
                        });
                        if (!partRes.ok) throw new Error('Failed to fetch part details');
                        const partData = await partRes.json();

                        return {
                            ...item,
                            ...partData,
                        };
                    })
                );

                const initialQuantities = {};
                enrichedItems.forEach((item) => {
                    const key = getKey(item);
                    initialQuantities[key] = item.quantity;
                });

                setCartItems(enrichedItems);
                setQuantities(initialQuantities);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        const newTotal = cartItems.reduce((acc, item) => {
            const key = getKey(item);
            const qty = quantities[key] || 0;
            return acc + item.price * qty;
        }, 0);
        setTotal(newTotal);
    }, [quantities, cartItems]);

    const handleRemove = async (itemToRemove) => {
        const key = getKey(itemToRemove);

        setCartItems((prevItems) =>
            prevItems.filter((item) => getKey(item) !== key)
        );

        setQuantities((prevQuantities) => {
            const updated = { ...prevQuantities };
            delete updated[key];
            return updated;
        });

        try {
            await fetch(`http://localhost:3000/api/carts/${itemToRemove.buyer_email}/${itemToRemove.part_id}/${itemToRemove.color}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('Item has been deleted successfully.');
        } catch (error) {
            console.error('Error removing item from backend:', error);
        }
    };

    // Function to handle saving the quantity
    const handleSaveQuantity = async (item) => {
        const key = getKey(item);
        const updatedQty = quantities[key];

        setSaving((prev) => ({ ...prev, [key]: true }));

        try {
            await fetch(`http://localhost:3000/api/carts/updateCartItem/${item.buyer_email}/${item.part_id}/${item.color}?quantity=${updatedQty}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            console.log(`Quantity updated for ${key}: ${updatedQty}`);
        } catch (error) {
            console.error('Error updating quantity:', error);
        } finally {
            setSaving((prev) => ({ ...prev, [key]: false }));
        }
    };

    return (
        <div className="container flex flex-col mx-auto p-6">
            {cartItems.map((item) => {
                const key = getKey(item);
                return (
                    <div key={key} className="section flex flex-col sm:flex-row border-b-2 py-4 mb-4 rounded-lg shadow-lg">
                        {/* Image */}
                        <div className="sm:w-1/4 mb-4 sm:mb-0 flex justify-center items-center">
                            <img
                                src={`/images/${item.part_type} 1.jpg`}
                                alt={item.part_name}
                                className="m-3 w-full h-auto object-contain max-w-full"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="sm:w-3/4 pl-4">
                            <h3 className="text-xl font-semibold text-white">{item.part_name}</h3>
                            <p className="text-lg text-gray-300">Price: ${item.price}</p>

                            {/* Quantity Selector */}
                            <div className="flex items-center mt-2">
                                <label htmlFor={`quantity-${key}`} className="text-white mr-2">Quantity:</label>
                                <input
                                    type="number"
                                    id={`quantity-${key}`}
                                    min="1"
                                    value={quantities[key] ?? item.quantity}
                                    onChange={(e) =>
                                        setQuantities((prev) => ({
                                            ...prev,
                                            [key]: parseInt(e.target.value) || 1,
                                        }))
                                    }
                                    className="px-3 py-2 rounded-md border border-gray-400 section text-white focus:outline-none w-20"
                                />
                            </div>

                            <p className="mt-2 text-gray-300">Color: {item.color}</p>
                            <p className="mt-1 text-gray-300">Subtotal: ${(item.price * (quantities[key] ?? item.quantity)).toFixed(2)}</p>

                            {/* Action Buttons */}
                            <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-6">
                                <button
                                    onClick={() => handleSaveQuantity(item)}
                                    disabled={saving[key]}
                                    className={`px-4 py-2 text-white bg-blue-500 rounded-md ${saving[key] ? 'bg-blue-600' : 'hover:bg-blue-600'}`}
                                >
                                    {saving[key] ? 'Saving...' : 'Save'}
                                </button>

                                <button
                                    className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                                    onClick={() => handleRemove(item)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}

            <hr className="my-6" />
            <h2 className="text-2xl font-semibold text-white">Grand Total: ${total.toFixed(2)}</h2>
            <button
                onClick={() => {
                    const updatedCart = cartItems.map((item) => {
                        const key = getKey(item);
                        return {
                            ...item,
                            quantity: quantities[key],
                        };
                    });
                    localStorage.setItem('cartData', JSON.stringify(updatedCart));
                    window.location.href = '/checkout';
                }}
                className="mt-6 px-6 py-3 text-white bg-black rounded-md hover:bg-white hover:text-black transition duration-300"
            >
                Proceed to Checkout
            </button>
        </div>
    );
};

export default ShoppingCart;
