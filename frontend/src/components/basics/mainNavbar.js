import React from 'react'

const MainNavbar = ({ handlers }) => {
    const { handleSearchBarClick, handleNavbarClose, setMenuEmpty, setMenu } = handlers;
    return (
        <>

            <nav className='navbar'>
                <div className='btn-group'>
                    <btn className='btn-group__item' onClick={() => { handleSearchBarClick(); setMenuEmpty(); }}>Search</btn>
                    <btn className='btn-group__item' onClick={() => { handleNavbarClose(); setMenu() }} >Home</btn>
                    <btn className='btn-group__item' onClick={() => window.location.href = "./login"} > Login</btn>
                    <btn className='btn-group__item' >MyAccount</btn>
                    <btn className='btn-group__item' >MyCart</btn>


                </div>
            </nav>
        </>
    )
}

export default MainNavbar
