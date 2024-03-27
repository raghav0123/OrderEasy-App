import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/context.js';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from './spinner.js';

const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    const Auth = JSON.parse(localStorage.getItem('auth'));

    useEffect(() => {
        const authCheck = async () => {

            try {
                const res = await axios.get("http://localhost:9002/api/v1/auth/user-auth");

                setOk(res.data.ok);
            } catch (error) {

                console.error("Error while checking authentication yessssss :", error);
                setOk(false);
            }
        };

        if (Auth?.token) {
            authCheck();
        }
    }, [Auth?.token]);

    return ok ? <Outlet /> : <Spinner />;
};

export default PrivateRoute;
