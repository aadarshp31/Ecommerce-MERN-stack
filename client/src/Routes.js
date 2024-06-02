import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./core/Home"
import "./core/Menu"
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminRoute from "./auth/helper/AdminRoutes";
import AdminDashboard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProduct from "./admin/ManageProducts"
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";
import ManageOrders from "./admin/ManageOrders";
import ManageUserInfo from "./user/ManageUserInfo";
import ManageUserOrders from "./user/ManageUserOrders";
import PasswordReset from "./user/PasswordReset";




const MyRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/user/dashboard" element={<PrivateRoute element={UserDashboard} />} />
                <Route path="/user/user-info" element={<PrivateRoute element={ManageUserInfo} />} />
                <Route path="/user/orders" element={<PrivateRoute element={ManageUserOrders} />} />
                <Route path="/user/password-reset" element={<PrivateRoute element={PasswordReset} />} />
                <Route path="/admin/dashboard" element={<AdminRoute element={AdminDashboard} />} />
                <Route path="/admin/create/category" element={<AdminRoute element={AddCategory} />} />
                <Route path="/admin/categories" element={<AdminRoute element={ManageCategories} />} />
                <Route path="/category/:categoryId/:userId" element={<AdminRoute element={UpdateCategory} />} />
                <Route path="/admin/create/product" element={<AdminRoute element={AddProduct} />} />
                <Route path="/admin/products" element={<AdminRoute element={ManageProduct} />} />
                <Route path="/admin/product/update/:productId" element={<AdminRoute element={UpdateProduct} />} />
                <Route path="/admin/orders" element={<AdminRoute element={ManageOrders} />} />
            </Routes>
        </Router>
    );
}

export default MyRoutes;