import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // You can also log out the user in the context if needed
        // If logout is handled elsewhere in the Navbar, this is just for page flow
        setTimeout(() => {
            navigate("/login"); // Redirect to login page after some delay (for example, 1 second)
        }, 1000); // You can show a message or animation during this time
    }, [navigate]);

    return (
        <div>
            <h2>Logging out...</h2>
        </div>
    );
};

export default Logout;
