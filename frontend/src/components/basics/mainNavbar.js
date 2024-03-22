import React, { useState } from "react";
import { useAuth, AuthProvider } from '../context/context.js'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
const MainNavbar = ({ handlers }) => {
    const { handleSearchBarClick, handleNavbarClose, setMenuEmpty, setMenu } = handlers;
    const [auth, setAuth] = useAuth();
    const [isActive, setIsActive] = useState(false);
    const handleDropdownClick = () => {
        setIsActive(!isActive);
    };

    console.log(auth)
    const Navigate = useNavigate()
    const logout = () => {

        setAuth({
            ...auth,
            user: null,
            token: ""

        })
        localStorage.removeItem('auth')
        setTimeout(() => {
            window.location.href = "./login";
        }, 1000); // Redirect after 1 second
        toast.success('Logout Successfully')

    }


    return (
        <>

            <nav className='mainNavbar'>
                <div className='btn-group'>
                    <btn className='btn-group__item' onClick={() => { handleNavbarClose(); setMenu(); Navigate('/') }}>OrderEasy</btn>
                </div>
                <div>
                    <div className='btn-group2'>
                        <btn className='btn-group__item' onClick={() => { handleSearchBarClick(); setMenuEmpty(); }}>Search</btn>

                        {auth.user != null ? (

                            auth.user.role == 1 ? (
                                <div className='butt'>
                                    <div class="dropdown">
                                        <button class="dropbtn" onClick={handleDropdownClick}>Admin</button>
                                        <div class={`dropdown-content ${isActive ? 'active' : ''}`}>
                                            <a href="/Dashboard/admin">Dashboard</a>
                                            <a onClick={logout}>Logout</a>

                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className='butt'>
                                    <div className={`dropdown ${isActive ? 'active' : ''}`}>
                                        <button className={`dropbtn ${isActive ? 'active' : ''}`} onClick={handleDropdownClick}>User</button>
                                        <div className={`dropdown-content ${isActive ? 'active' : ''}`}>
                                            <a href="/Dashboard/user">Dashboard</a>
                                            <a onClick={logout} >Logout</a>

                                        </div>
                                    </div>
                                </div>
                            )


                        ) : (
                            <button className='btn-group__item' onClick={() => window.location.href = "./register"}>Register</button>
                        )}
                        <btn className='btn-group__item' >MyCart</btn>



                    </div>
                </div>
            </nav>
        </>
    )
}

export default MainNavbar
