import React, { useState, useRef } from 'react';
import './SearchBar.css';

const SearchBar = ({ filterItemOnSearch }) => {

    const searchRef = useRef(null)

    // const handleSearchChange = (event) => {
    //     setSearchTerm(event.target.value);
    // };

    const handleSearchClick = () => {
        // alert(`Searching for: ${searchTerm}`);
        console.log(searchRef.current)
    };

    return (
        <nav className='navbar'>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                    ref={searchRef}
                />
                <button className="search-button" onClick={() => filterItemOnSearch(searchRef.current.value)}>Search</button>
            </div>
        </nav>
    );
};

export default SearchBar;
