import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";
import Menu from "../menuApi";
import MenuCard from "../MenuCard";
import Navbar from "../Navbar";
import SearchBar from "../SearchBar";
import MainNavbar from "../mainNavbar";
import { useAuth, AuthProvider } from "../../context/context.js";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminMenu from "./adminMenu";
import "../../../index.css";
const Products = () => {
  const [products, setProducts] = useState([]);

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
    setMenuData([]);
  };
  const setMenu = () => {
    setMenuData(Menu);
  };
  const filterItem = (category) => {
    if (category !== "all") {
      const updatedList = Menu.filter((currElem) => {
        return currElem.category === category;
      });
      setMenuData(updatedList);
    } else {
      setMenuData(Menu);
    }
  };
  const filterItemOnSearch = (Name) => {
    const updatedList = Menu.filter((currElem) => {
      return currElem.name == Name;
    });

    setMenuData(updatedList);
  };

  //getall products
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
      <div className="Container">
        <div
          className="sub-Container1"
          style={{ borderRight: "1px solid rgb(209, 208, 208)" }}
        >
          <AdminMenu></AdminMenu>
        </div>
        <div className="sub-Container2" >
          <div className="row-3" style={{  zIndex: "2" ,position:"relative" }}>
            <MainNavbar
              handlers={{
                handleSearchBarClick,
                handleNavbarClose,
                setMenu,
                setMenuEmpty,
              }}
            />
          </div>
          <div className="row-9 " style={{  zIndex: "1" ,position:"relative" }}>
            <div className="row justify-content-center">
              <div className="col justify-content-center">
                <div className="d-flex">
                  {products?.map((p) => (
                    <Link
                      key={p._id}
                      to={`/dashboard/admin/product/${p.slug}`}
                      className="product-link"
                    >
                      <div
                        className="card m-4 "
                        style={{
                          width: "25rem",
                          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                        }}
                      >
                        <img
                          src={`http://localhost:9002/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          style={{
                            width: "100%",
                            margin: "0",
                            padding: "0",
                            height: "24rem",
                          }}
                        />
                        <div className="card-body text-center ">
                          <p
                            className="card-subtitle  "
                            style={{ fontSize: "26px" }}
                          >
                            {p.name}
                          </p>
                          <p className="card-text">{p.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
