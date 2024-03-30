import "./App.css";
import Register from "./components/register/register";
import Login from "./components/login/login";
import { useAuth, AuthProvider } from "./components/context/context.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Restaurant from "./components/basics/Restaurant";
import UpdateProduct from "./components/basics/Admin/UpdateProduct.js";
import { getTokenFromStorage, verifyToken } from "./authUtils.js"; // Custom utility functions for handling tokens
import PrivateRoute from "./components/routes/private";
import ForgetPassword from "./components/forget-password/forget-password.js";
import AdminRoute from "./components/routes/adminRoute.js";
import AdminRegister from "./components/register/adminRegister";
import AdminLogin from "./components/login/adminLogin";
import AdminDashboard from "./components/basics/Admin/adminDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateProduct from "./components/basics/Admin/createProduct";
import CreateCategory from "./components/basics/Admin/createCategory";
import Users from "./components/basics/Admin/users";
import UserDashboard from "./components/basics/Users/userDashboard";
import Products from "./components/basics/Admin/products";
import PageNotFound from "./components/basics/Users/pageNotFound.js";
const App = () => {
  const [auth, setAuth] = useAuth();
  const [user, setLoginUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getTokenFromStorage(); // Function to retrieve token from local storage or cookies

    if (token) {
      const isValidToken = verifyToken(token); // Function to verify token validity
      setIsLoggedIn(isValidToken);
    }
  }, []);
  const AUTH = JSON.parse(localStorage.getItem("auth"));

  useEffect(() => {
    const AuthString = localStorage.getItem("auth");
    const Auth = JSON.parse(AuthString);
    if (Auth) {
      setAuth({
        ...auth,
        user: Auth.user,
        token: Auth.token,
      });
    }
  }, [auth]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Restaurant setLoginUser={setLoginUser} />}
          />
          <Route path="/forget-password" element={<ForgetPassword />}></Route>
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<UserDashboard />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-product" element={<CreateProduct />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
            <Route path="admin/users" element={<Users />} />
          </Route>

          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route
            path="/login"
            element={<Login setLoginUser={setLoginUser} />}
          />
          <Route path="/adminRegister" element={<AdminRegister />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
