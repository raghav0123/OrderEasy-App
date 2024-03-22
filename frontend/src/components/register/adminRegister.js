import React, { useState } from "react"
import "./register.css"
import axios from "axios"
import { useNavigate, Link } from 'react-router-dom';


const AdminRegister = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        // 👇️ navigate programmatically
        navigate('/adminLogin');
    };


    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: "",
        phone: "",
        address: "",
        answer: "",
        role: 1

    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword, phone, address, answer, role } = user
        if (name && email && password && (password === reEnterPassword) && phone && address && answer) {
            axios.post("http://localhost:9002/api/v1/auth/adminRegister", user)
                .then(res => {
                    alert(res.data.message)
                    navigate('/adminLogin')
                })
                .catch((error) => {

                    console.log("Error:", error)
                })
        } else {
            alert("invalid input")
        }

    }

    return (
        <div className="Regi-Cont">
            <div className="register">
                {console.log("User", user)}
                <h1>Admin Register</h1>
                <div className="label" >Name:</div>
                <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}></input>
                <div className="label" >Email:</div>
                <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
                <div className="label" >Password:</div>
                <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={handleChange}></input>
                <div className="label" >Reenter password:</div>
                <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange}></input>
                <div className="label" >Phone:</div>
                <input type="text" name="phone" value={user.phone} placeholder="Your Phone No" onChange={handleChange}></input>
                <div className="label" >Address:</div>
                <input type="text" name="address" value={user.address} placeholder="Your Address" onChange={handleChange}></input>
                <div className="label" >Your favourite pet?</div>
                <input type="text" name="answer" value={user.answer} placeholder="Your answer" onChange={handleChange}></input>
                <div className="button" onClick={register} >Register</div>
                <div>or</div>
                <div className="button" onClick={handleClick}>Login</div>
                <Link to="/Register" style={{ color: 'black' }}>Are You A User?</Link>
            </div>
        </div>
    )
}

export default AdminRegister