import React, { useState, useRef } from 'react';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom'
const SearchBar = ({ filterItemOnSearch }) => {
    const navigate = useNavigate()
    const searchRef = useRef(null)

    // const handleSearchChange = (event) => {
    //     setSearchTerm(event.target.value);
    // };


    return (
        <nav className='navbar'>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                    ref={searchRef}
                />
                <button className="search-button" onClick={() => { filterItemOnSearch(searchRef.current.value) }}>Search</button>
            </div>
        </nav>
    );
};

export default SearchBar;
