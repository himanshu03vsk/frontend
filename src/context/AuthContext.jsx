// context/AuthContext.js
import { createContext, useState, useContext } from 'react';

// Create the context for auth
const AuthContext = createContext();

// Define the AuthProvider to wrap around your application
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData)); // Store user data in localStorage
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Hook to use the AuthContext in other components
export function useAuth() {
    return useContext(AuthContext);
}
