import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const AdminMenu = () => {
    const navigate = useNavigate()
    return (
        <>
            <div class="text-center">
                <div class="list-group">
                    <h1 class='h1'>Admin Panel</h1>
                    <br></br>
                    <button className='btn-group__item' onClick={() => { navigate('/dashboard/admin/create-category'); }} class="btn-group__item2 link">Create Category</button >
                    <button className='btn-group__item' onClick={() => { navigate('/dashboard/admin/create-product'); }} class="btn-group__item2 link">Create Product</button >
                    <button className='btn-group__item' onClick={() => { navigate('/dashboard/admin/users'); }} class=" btn-group__item2  link">Users</ button>

                </div>
            </div>
        </>
    )
}

export default AdminMenu
