import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import "./confirmation.css";


const Confirmation = () => {


    const { id } = useParams();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch(`https://backend-carshop.onrender.com/api/cart/${id}`);
                const data = await response.json();
                setCart(data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, [id]);

    return (
        <div className="confirmation">
            <h2>Order Confirmation</h2>
            {cart.length > 0 ? (
                <div>
                    {/* Cart details will go here */}
                </div>
            ) : (
                <p>Loading cart details...</p>
            )}
        </div>
    );
}