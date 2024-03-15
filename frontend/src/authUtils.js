const jwt_decode = require("jwt-decode");

// Function to retrieve token from local storage or cookies
export const getTokenFromStorage = () => {
    // Check if the token is stored in local storage
    const auth = localStorage.getItem('auth');
    const token = auth ? JSON.parse(auth).token : null;
    // If token is found, return it
    return token;
};

// Function to verify token validity
export const verifyToken = (token) => {
    try {
        // Decode the token to extract payload
        const decodedToken = jwt_decode(token);

        // Check token expiration
        const currentTime = Date.now() / 1000;
        console.log(token, currentTime, decodedToken.exp)
        if (decodedToken.exp < currentTime) {
            // Token has expired
            return false;
        }

        // Token is valid
        return true;
    } catch (error) {
        // Error decoding token or token format is invalid
        return false;
    }
};
