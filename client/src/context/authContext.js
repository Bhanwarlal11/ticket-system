// authContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getUserProfile } from '../api/api';
import Cookies from 'js-cookie';


// Create the authentication context
const AuthContext = createContext();

// Custom hook to use authentication context
// export const useAuth = () => useContext(AuthContext);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component to wrap the app and provide authentication state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role,setRole] = useState(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = Cookies.get('token'); // Get token from cookies

      if (token) {
        try {
          // Send a request to check if the token in cookies is valid
          const response = await getUserProfile(); // Assume this makes an API call to validate the token

          if (response.data.success) {
            setIsAuthenticated(true);
            setUser(response.data.user);
            setRole(response.data.user.role);
          } else {
            setIsAuthenticated(false);
            setUser(null);
            setRole(null);
          }
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
          setRole(null);
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setRole(null);
      }
    };

    // Check the authentication status when the app mounts
    checkAuthStatus();
  }, []); // Empty dependency array, so it runs once on mount


  // Login function to update the authentication state
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setRole(userData.role);

  };

  // Logout function to clear the authentication state
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user,role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
