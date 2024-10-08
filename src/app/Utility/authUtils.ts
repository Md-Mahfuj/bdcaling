// import { jwtDecode } from "jwt-decode";

// /**
//  * Checks the login status of a user based on the JWT in cookies.
//  * @returns {{ isLoggedIn: boolean, role: string | null }} An object containing the login status and user role.
//  */
// export const checkLoginStatus = () => {
//   const token = document.cookie.split('; ').find(row => row.startsWith('token='));

//   if (token) {
//     const tokenValue = token.split('=')[1]; // Get the token value
//     try {
//       const decodedToken = jwtDecode(tokenValue); // Decode the token
//       return {
//         isLoggedIn: true,
//         role: decodedToken.role || null, // Return the role or null if not found
//       };
//     } catch (error) {
//       console.error("Failed to decode token:", error);
//       return { isLoggedIn: false, role: null }; // Invalid token
//     }
//   } else {
//     console.warn("No token found in cookies.");
//     return { isLoggedIn: false, role: null }; // No token
//   }
// };



import { jwtDecode } from "jwt-decode";

/**
 * Interface representing the login status and user role.
 */
interface LoginStatus {
  isLoggedIn: boolean;
  role: string | null; 
  name?: string | null;
  id?: string  | null;

}

/**
 * Checks the login status of a user based on the JWT in cookies.
 * @returns {LoginStatus} An object containing the login status and user role.
 */
export const checkLoginStatus = (): LoginStatus => {
  const token = document.cookie.split('; ').find(row => row.startsWith('token='));

  if (token) {
    const tokenValue = token.split('=')[1]; // Get the token value
    try {
      const decodedToken: { role?: string, name?: string,id?: string  } = jwtDecode(tokenValue); // Decode the token with expected shape
      return {
        isLoggedIn: true,
        role: decodedToken.role || null,
        name: decodedToken.name ||  null, 
        id:decodedToken.id,
       
      };
    } catch (error) {
      console.error("Failed to decode token:", error);
      return { isLoggedIn: false, role: null }; // Invalid token
    }
  } else {
    console.warn("No token found in cookies.");
    return { isLoggedIn: false, role: null }; // No token
  }
};

