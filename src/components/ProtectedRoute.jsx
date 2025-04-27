import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext to get the token

const ProtectedRoute = ({ children }) => {
    const { token } = useAuth(); // Get token from context
    const navigate = useNavigate();

    useEffect(() => {
        // If the user is not logged in (i.e., no token in context)
        if (!token) {
            navigate("/login"); // Redirect to login page
        }
    }, [token, navigate]);

    // If the user is logged in, render the children components (protected page)
    return token ? children : null;
};

export default ProtectedRoute;
