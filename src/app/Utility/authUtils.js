// import { decode } from 'jwt-decode';

import { jwtDecode } from "jwt-decode";

/**
 * Checks the login status of a user based on the JWT in cookies.
 * @returns {Object} An object containing the login status and user role.
 */
export const checkLoginStatus = () => {
  const token = document.cookie.split('; ').find(row => row.startsWith('token='));

  if (token) {
    const tokenValue = token.split('=')[1]; // Get the token value
    try {
      const decodedToken = jwtDecode(tokenValue); // Decode the token
      return {
        isLoggedIn: true,
        role: decodedToken.role || null, // Return the role or null if not found
      };
    } catch (error) {
      console.error("Failed to decode token", error);
      return { isLoggedIn: false, role: null }; // Invalid token
    }
  } else {
    return { isLoggedIn: false, role: null }; // No token
  }
};
