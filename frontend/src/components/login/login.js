import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { json, useNavigate, Link } from 'react-router-dom';
import { useAuth, AuthProvider } from '../context/context.js'


const Login = ({ setLoginUser }) => {
    // const [auth, setAuth] = useAuth()
    // console.log(auth)
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const handleClick = () => {
        // 👇️ navigate programmatically
        navigate('/register');
    };
    const [auth, setAuth] = useAuth();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const login = () => {
        axios
            .post("http://localhost:9002/api/v1/auth/login", user)
            .then((res) => {
                alert(res.data.message);


                setLoginUser(res.data.user);

                const response = res.data;
                if (res && res.data.success) {
                    setAuth({
                        ...auth,
                        user: res.data.user,
                        token: res.data.token

                    })
                    localStorage.setItem('auth', JSON.stringify(res.data))
                }
                navigate('/')
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.message) {
                    setError(error.response.data.message);
                } else {
                    setError('An error occurred');
                }
                console.log("Error:", error)
            })
    };

    return (
        <div className="Login-Container">
            <div className="login">
                <h1>User Login</h1>
                <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter your Email"
                />
                <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Enter your Password"
                />
                <div className="button" onClick={() => { navigate('/forget-password'); }}>

                    forget Password
                </div>
                <div className="button" onClick={() => { login(); }}>

                    Login
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <div>or</div>
                <div className="button" onClick={handleClick}>
                    Register
                </div>
                <Link to="/adminLogin" style={{ color: 'black' }}>Are You An Admin?</Link>
            </div>
        </div>
    );
};

export default Login;
