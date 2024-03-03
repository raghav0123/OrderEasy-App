import React, { useState } from 'react';
import './style.css';
import Menu from './menuApi';
import MenuCard from './MenuCard';
import Navbar from './Navbar';
import SearchBar from './SearchBar'
import MainNavbar from './mainNavbar';


const uniqueList = [...new Set(Menu.map((currElem) => {

    return currElem.category;
})), 'all'];

const Restaurant = ({ setLoginUser }) => {
    const [menuData, setMenuData] = useState(Menu);
    const [menuList, setMenuList] = useState(uniqueList)

    const [showNavbar, setShowNavbar] = useState(true);

    const handleSearchBarClick = () => {
        setShowNavbar(false); // Hide Navbar when search bar is clicked

    };

    const handleNavbarClose = () => {
        setShowNavbar(true); // Show Navbar when it's closed
    };
    const setMenuEmpty = () => {
        setMenuData([])
    }
    const setMenu = () => {
        setMenuData(Menu)
    }
    const filterItem = (category) => {
        if (category !== 'all') {
            const updatedList = Menu.filter((currElem) => {

                return currElem.category === category;
            })
            setMenuData(updatedList);
        }
        else {
            setMenuData(Menu)
        }
    };
    const filterItemOnSearch = (Name) => {

        const updatedList = Menu.filter((currElem) => {

            return currElem.name == Name;
        })

        setMenuData(updatedList);


    };


    return (

        <>
            <MainNavbar handlers={{ handleSearchBarClick, handleNavbarClose, setMenu, setMenuEmpty }} />
            {showNavbar && <Navbar filterItem={filterItem} menuList={menuList} />}
            {!showNavbar && <SearchBar filterItemOnSearch={filterItemOnSearch} />}
            <MenuCard menuData={menuData} />

            <div className="btn_cont">

                <div className="logout-btn" onClick={() => setLoginUser({})} >Logout</div>
            </div>
        </>

    )
};

export default Restaurant
