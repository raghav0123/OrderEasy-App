import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import './style.css';
import Menu from './menuApi';
import MenuCard from './MenuCard';
import Navbar from './Navbar';
import SearchBar from './SearchBar'
import MainNavbar from './mainNavbar';
import { useAuth, AuthProvider } from '../context/context.js'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
const uniqueList = [...new Set(Menu.map((currElem) => {

    return currElem.category;
})), 'all'];

const Restaurant = ({ setLoginUser }) => {
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth();
    const [products, setProducts] = useState([]);
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

    const getAllProducts = async () => {
        try {
          const { data } = await axios.get(
            "http://localhost:9002/api/v1/product/get-product"
          );
          setProducts(data.products);
        } catch (error) {
          console.log(error);
          toast.error("Someething Went Wrong");
        }
      };
    
      //lifecycle method
      useEffect(() => {
        getAllProducts();
      }, []);

    return (

        <>
            <MainNavbar handlers={{ handleSearchBarClick, handleNavbarClose, setMenu, setMenuEmpty }} />
            {showNavbar && <Navbar filterItem={filterItem} menuList={menuList} />}
            {!showNavbar && <SearchBar filterItemOnSearch={filterItemOnSearch} />}
            <MenuCard menuData={products} />


        </>

    )
};

export default Restaurant
