import React, { useEffect } from 'react';
import './spinner.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom'; // Import useHistory from react-router-dom

const Spinner = () => {
    const navigate = useNavigate(); // Get history object from react-router-dom

    useEffect(() => {
        // Set a timeout to redirect after 3 seconds
        const timeout = setTimeout(() => {
            navigate('/login'); // Redirect to homepage
        }, 3000);

        // Cleanup function to clear the timeout
        return () => clearTimeout(timeout);
    }); // Include history in the dependency array

    return (
        <div className="spinner-container">
            <div className="spinner"></div>
        </div>
    );
};

export default Spinner;
