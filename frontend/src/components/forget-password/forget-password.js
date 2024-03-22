import React, { useState } from "react";
import './forget-password.css'
import axios from "axios";
import { json, useNavigate } from 'react-router-dom';
import { useAuth, AuthProvider } from '../context/context.js'


const ForgetPassword = ({ setLoginUser }) => {
    // const [auth, setAuth] = useAuth()
    // console.log(auth)
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [auth, setAuth] = useAuth();
    const [user, setUser] = useState({
        email: "",
        newPassword: "",
        answer: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const submit = () => {
        axios
            .post("http://localhost:9002/api/v1/auth/forget-password", user)
            .then((res) => {
                alert(res.data.message);

                const response = res.data;
                navigate('/login');
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.message) {
                    setError(error.response.data.message);
                } else {
                    setError('An error occurred');
                }
                console.log("Error:", error);
            });
    };


    return (
        <div className="Login-Container">
            <div className="login">
                <h1>Forget Password</h1>
                <br></br>
                <div className="label" >Email:</div>
                <input type="text" name="email" value={user.email} placeholder="Your Name" onChange={handleChange}></input>
                <div className="label" >New Password:</div>
                <input type="text" name="newPassword" value={user.newPassword} placeholder="Your Password" onChange={handleChange}></input>
                <div className="label" >Your Favourite Pet?:</div>
                <input type="text" name="answer" value={user.answer} placeholder="Your Password" onChange={handleChange}></input>
                <div className="button" onClick={() => { submit(); }}>

                    Submit
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}

            </div>
        </div>
    );
};

export default ForgetPassword;
