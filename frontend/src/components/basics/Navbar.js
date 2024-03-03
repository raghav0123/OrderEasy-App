import React from 'react'

const Navbar = ({ filterItem, menuList }) => {
    return (
        <>

            <nav className='navbar'>
                <div className='btn-group'>
                    {menuList.map((currElem) => {
                        return <btn className='btn-group__item' onClick={() => filterItem(currElem)}>{currElem}</btn>
                    })}

                    {/* <btn className='btn-group__item' onClick={() => setMenuData(Menu)}>all</btn> */}


                </div>
            </nav>
        </>
    )
}

export default Navbar
