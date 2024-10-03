/**
 * Clears JWT token from cookies, local storage, and session storage to log the user out.
 * Redirects to a specified page after sign-out (optional).
 * 
 * @param {string} redirectUrl - The URL to redirect after sign-out (optional, defaults to '/login').
 */
export const signOut = (redirectUrl = '/login') => {
    // 1. Clear the token from cookies by setting its expiration date in the past
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // 2. Clear the token from localStorage and sessionStorage (if used)
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    
    // 3. Redirect to the login page or any specified page after sign-out
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };
  