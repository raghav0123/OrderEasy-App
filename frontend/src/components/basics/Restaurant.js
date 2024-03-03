import React, { useState } from 'react';
import './style.css';
import Menu from './menuApi';
import MenuCard from './MenuCard';
import Navbar from './Navbar';
import SearchBar from './SearchBar'
const uniqueList = [...new Set(Menu.map((currElem) => {

    return currElem.category;
})), 'all'];

const Restaurant = ({ setLoginUser }) => {
    const [menuData, setMenuData] = useState(Menu);
    const [menuList, setMenuList] = useState(uniqueList)
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
            console.log('2')
            console.log(Name)
            return currElem.name == Name;
        })

        setMenuData(updatedList);


    };


    return (

        <>
            <Navbar filterItem={filterItem} menuList={menuList} />
            <SearchBar filterItemOnSearch={filterItemOnSearch} />
            <MenuCard menuData={menuData} />

            <div className="btn_cont">

                <div className="logout-btn" onClick={() => setLoginUser({})} >Logout</div>
            </div>
        </>

    )
};

export default Restaurant
