import { useNavigate, useParams } from "react-router-dom";
import "../style.css";
import Menu from "../menuApi";
import MenuCard from "../MenuCard";
import Navbar from "../Navbar";
import SearchBar from "../SearchBar";
import MainNavbar from "../mainNavbar";
import { useAuth, AuthProvider } from "../../context/context.js";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminMenu from "./adminMenu";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import "./admin.css";
const { Option } = Select;

const UpdateProduct = () => {
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

  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const params = useParams();
  const [id, setId] = useState("");
  const [cat, setCat] = useState("");
  //GET SINGLE PRDUCT
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:9002/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCat( data.product.category);
      setCategory(data.product.category._id)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:9002/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `http://localhost:9002/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.success(data.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
//DELETE PRODUCT
const handleDelete = async (e) => {
  e.preventDefault();
  try {
    let answer= window.prompt('Are you sure?')
    if (!answer){
      return 
    }
    const { data } = axios.delete(
      `http://localhost:9002/api/v1/product/delete-product/${id}`
      
    );
    
    toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    
  } catch (error) {
    console.log(error);
    toast.error("something went wrong");
  }
};
  return (
    <>
      <div className="Container">
        <div
          className="sub-Container1"
          style={{ borderRight: "1px solid rgb(209, 208, 208)" }}
        >
          <AdminMenu></AdminMenu>
        </div>
        <div className="sub-Container2 ">
          <div className="row-3">
            <MainNavbar
              handlers={{
                handleSearchBarClick,
                handleNavbarClose,
                setMenu,
                setMenuEmpty,
              }}
            />
          </div>
          <div className=" text-center row-9 ">
            <div className="CARD w-100 p-1 h-100  ">
              <h1>Update Product</h1>
              <div className="container-fluid  p-4">
                <div className="row mt-2">
                  <div className="">
                    <Select
                      bordered={false}
                      placeholder="enter Category "
                      size="large"
                      showSearch
                      className="form-select mb-3"
                      onChange={(value) => {
                        setCategory(value);
                      }}
                      value={cat.name}
                    >
                      {categories?.map((c) => (
                        <Option key={c._id} value={c._id}>
                          {c.name}
                        </Option>
                      ))}
                    </Select>
                    <div className="mb-3">
                      <label className="btn btn-outline-secondary col-md-12">
                        {photo ? photo.name : "Upload Photo"}
                        <input
                          type="file"
                          name="photo"
                          accept="image/*"
                          onChange={(e) => setPhoto(e.target.files[0])}
                          hidden
                        />
                      </label>
                    </div>
                    <div className="mb-3">
                      {photo ? (
                        <div className="text-center">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt="product_photo"
                            height={"180px"}
                            className="img img-responsive"
                          />
                        </div>
                      ) : (
                        <div className="text-center">
                          <img
                            src={`http://localhost:9002/api/v1/product/product-photo/${id}`}
                            alt="product_photo"
                            height={"180px"}
                            className="img img-responsive"
                          />
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        value={name}
                        placeholder="write a name"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        type="text"
                        value={description}
                        placeholder="write a description"
                        className="form-control"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="mb-3">
                      <input
                        type="number"
                        value={price}
                        placeholder="write a Price"
                        className="form-control"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="number"
                        value={quantity}
                        placeholder="write a quantity"
                        className="form-control"
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <Select
                        bordered={false}
                        placeholder="Select Shipping "
                        size="large"
                        showSearch
                        className="form-select mb-3"
                        onChange={(value) => {
                          setShipping(value);
                        }}
                      >
                        <Option value="0">No</Option>
                        <Option value="1">Yes</Option>
                      </Select>
                    </div>
                    <div className="mb-3">
                      <button
                        className="btn btn-primary m-2"
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger m-2"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
