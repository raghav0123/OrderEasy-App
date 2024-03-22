import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const UserMenu = () => {
    const navigate = useNavigate()
    return (
        <>
            <div class="text-center">
                <div class="list-group">
                    <h1 class='h1'>User Panel</h1>
                    <br></br>
                    <button className='btn-group__item' onClick={() => { navigate('/dashboard/users/profile'); }} class="btn-group__item2 link">Profile</button >
                    <button className='btn-group__item' onClick={() => { navigate('/dashboard/users/orders'); }} class="btn-group__item2 link">Orders</button >


                </div>
            </div>
        </>
    )
}

export default UserMenu
