import React from 'react'
import { useAuth, AuthProvider } from '../context/context.js'
import toast from 'react-hot-toast'
const MainNavbar = ({ handlers }) => {
    const { handleSearchBarClick, handleNavbarClose, setMenuEmpty, setMenu } = handlers;
    const [auth, setAuth] = useAuth();
    console.log(auth)
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

            <nav className='navbar'>
                <div className='btn-group'>
                    <btn className='btn-group__item' onClick={() => { handleSearchBarClick(); setMenuEmpty(); }}>Search</btn>
                    <btn className='btn-group__item' onClick={() => { handleNavbarClose(); setMenu() }} >Home</btn>
                    {auth.user != null ? (
                        <button className='btn-group__item' onClick={logout}>Logout</button>
                    ) : (
                        <button className='btn-group__item' onClick={() => window.location.href = "./register"}>Register</button>
                    )}
                    <btn className='btn-group__item' >MyAccount</btn>
                    <btn className='btn-group__item' >MyCart</btn>


                </div>
            </nav>
        </>
    )
}

export default MainNavbar
