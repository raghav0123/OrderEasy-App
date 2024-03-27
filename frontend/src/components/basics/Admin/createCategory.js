import axios from "axios";
import toast from "react-hot-toast";
import React, { useState, useEffect, useContext } from 'react';
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
import { Modal } from "antd";
import CategoryForm from "./categoryForm";


const CreateCategory = () => {
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

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    //handle Form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:9002/api/v1/category/create-category", {
                name,
            });
            if (data?.success) {
                toast.success(`${name} is created`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("somthing went wrong in input form");
        }
    };

    //get all cat

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get("http://localhost:9002/api/v1/category/get-category");

            if (data.success) {
                setCategories(data.category);
            }
        } catch (error) {

            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `http://localhost:9002/api/v1/category/update-category/${selected._id}`,
                { name: updatedName }
            );
            if (data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Somtihing went wrong");
        }
    };
    //delete category
    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(
                `http://localhost:9002/api/v1/category/delete-category/${pId}`
            );
            if (data.success) {
                toast.success(`category is deleted`);

                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Somtihing went wrong");
        }
    };

    return (
        <>

            <div className='Container' title='Dashboard - CreateCategory'>

                <div className='sub-Container1'>
                    <AdminMenu ></AdminMenu>
                </div>
                <div className='sub-Container2'>

                    <MainNavbar handlers={{ handleSearchBarClick, handleNavbarClose, setMenu, setMenuEmpty }} />
                    <div className='mainC'>
                        <div className='card w-50 p-3 m-5 '>
                            <div className="container-fluid m-3 p-3">
                                <div className="row">

                                    <div className="col-md-9">
                                        <h1>Manage Category</h1>
                                        <div className="p-3 w-50">
                                            <CategoryForm
                                                handleSubmit={handleSubmit}
                                                value={name}
                                                setValue={setName}
                                            />
                                        </div>
                                        <div className="w-75">
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {categories?.map((c) => (
                                                        <>
                                                            <tr>
                                                                <td key={c._id}>{c.name}</td>
                                                                <td>
                                                                    <button
                                                                        className="btn btn-primary ms-2"
                                                                        onClick={() => {
                                                                            setVisible(true);
                                                                            setUpdatedName(c.name);
                                                                            setSelected(c);
                                                                        }}
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-danger ms-2"
                                                                        onClick={() => {
                                                                            handleDelete(c._id);
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                        <Modal
                                            onCancel={() => setVisible(false)}
                                            footer={null}
                                            visible={visible}
                                        >
                                            <CategoryForm
                                                value={updatedName}
                                                setValue={setUpdatedName}
                                                handleSubmit={handleUpdate}
                                            />
                                        </Modal>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateCategory
