

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
import AdminMenu from './adminMenu';

const CreateProduct = () => {
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
                    <AdminMenu ></AdminMenu>
                </div>
                <div className='sub-Container2'>

                    <MainNavbar handlers={{ handleSearchBarClick, handleNavbarClose, setMenu, setMenuEmpty }} />
                    <div className='mainC'>
                        <div className='card w-50 p-3 m-5 '>
                            <h2> create Product</h2>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateProduct
