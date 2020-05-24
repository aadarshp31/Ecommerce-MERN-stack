import React from "react";
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
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


const Routes = () => {
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/signin" component={Signin} />
                <PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
                <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
                <AdminRoute exact path="/admin/create/category" component={AddCategory} />
                <AdminRoute exact path="/admin/categories" component={ManageCategories} />
                <AdminRoute exact path="/admin/create/product" component={AddProduct} />
            </Switch>
        </Router>
    );
}

export default Routes;