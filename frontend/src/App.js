
import './App.css';
import Register from './components/register/register'
import Login from './components/login/login'
import { useAuth, AuthProvider } from './components/context/context.js'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from 'react';
import Restaurant from './components/basics/Restaurant'
import Dashboard from './components/basics/dashBoard.js';
import { getTokenFromStorage, verifyToken } from './authUtils.js'; // Custom utility functions for handling tokens
import PrivateRoute from './components/routes/private';

const App = () => {

  const [auth, setAuth] = useAuth();
  const [user, setLoginUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getTokenFromStorage(); // Function to retrieve token from local storage or cookies

    if (token) {
      const isValidToken = verifyToken(token); // Function to verify token validity
      setIsLoggedIn(isValidToken);
    }
  }, []);


  useEffect(() => {

    const AuthString = localStorage.getItem('auth');
    const Auth = JSON.parse(AuthString)
    if (Auth) {
      setAuth({
        ...auth,
        user: Auth.user,
        token: Auth.token

      })
    }
  }, [auth]);




  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path='/' element={

            <Restaurant setLoginUser={setLoginUser} />


          } />
          <Route path='/dashboard' element={<PrivateRoute />} >
            <Route path='' element={<Dashboard />} />
          </Route >
          <Route path='/login' element={<Login setLoginUser={setLoginUser} />} />
          <Route path='/register' element={<Register />} />
        </Routes>

      </Router>


    </div>
  );
}

export default App;
