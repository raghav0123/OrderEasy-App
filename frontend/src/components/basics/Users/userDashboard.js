

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import '../style.css';
import Menu from '../menuApi';
import MenuCard from '../MenuCard';
import Navbar from '../Navbar';
import SearchBar from '../SearchBar'
import MainNavbar from '../mainNavbar';
import { useAuth, AuthProvider } from '../../context/context.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserMenu from './userMenu';

const UserDashboard = () => {
    const [auth, setAuth] = useAuth();

    const [menuData, setMenuData] = useState(Menu);


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

            <div className='Container'>

                <div className='sub-Container1'>
                    <UserMenu ></UserMenu>
                </div>
                <div className='sub-Container2'>

                    <MainNavbar handlers={{ handleSearchBarClick, handleNavbarClose, setMenu, setMenuEmpty }} />
                    <div className='mainC'>
                        <div className='card w-50 p-3 m-5 '>
                            <h2> Name: <span>{auth?.user?.name}</span></h2>
                            <h2> Email: {auth?.user?.email}</h2>
                            <h2> phone no: {auth?.user?.phone}</h2>
                            <h2> Address: {auth?.user?.address}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserDashboard
