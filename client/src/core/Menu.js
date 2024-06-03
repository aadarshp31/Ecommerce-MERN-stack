import React, { Fragment } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper/index";
import SearchBar from "./SearchBar";

const currentTab = (location, path) => {
	if (location.pathname === path) {
		return "text-muted";
	} else {
		return "text-light";
	}
};

const Menu = () => {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-info fixed-top font-weight-bold gradient">
			<Link className="navbar-brand text-light" to="/">Ecommerce</Link>
			<SearchBar />
			<button className="navbar-toggler text-white border-white" type="button" data-toggle="collapse" data-target="#navbarToggler">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarToggler">
				<ul className="navbar-nav ml-auto mt-2 mt-lg-0 p-2 font-weight-bold">
					<li className="nav-item">
						<Link className={`nav-link ${currentTab(location, "/")}`} to="/">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link
							className={`nav-link ${currentTab(location, "/cart")}`}
							to="/cart"
						>
							Cart
						</Link>
					</li>

					{/* Displays/Returns Dashboard nav button when user is authenticated, otherwise hides it from navbar */}
					{isAuthenticated() && (
						<li className="nav-item">
							<Link
								className={`nav-link ${currentTab(location, "/user/dashboard")}`}
								to="/user/dashboard"
							>
								Dashboard
							</Link>
						</li>
					)}

					{/* Displays/Returns Admin Dashboard nav button when user is admin, otherwise hides it from navbar */}
					{/* Admin Dashboard is not accessible to the non-admin users */}
					{isAuthenticated() && isAuthenticated().user.role === 1 && (
						<li className="nav-item">
							<Link
								className={`nav-link ${currentTab(location, "/admin/dashboard")}`}
								to="/admin/dashboard"
							>
								Admin
							</Link>
						</li>
					)}

					{/* Displays/Returns Signin nav button when user is not authenticated, otherwise hides it from navbar */}
					{!isAuthenticated() && (
						<Fragment>
							<li className="nav-item">
								<Link
									className={`nav-link ${currentTab(location, "/signup")}`}
									to="/signup"
								>
									Signup
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className={`nav-link ${currentTab(location, "/signin")}`}
									to="/signin"
								>
									Signin
								</Link>
							</li>
						</Fragment>
					)}
					{/* Displays/Returns Signout nav button when user is authenticated, otherwise hides it from navbar */}
					{/* onCLick event fires a callback to initiate "signout" method which fires callback to redirect the user to "/" */}
					{isAuthenticated() && (
						<li
							className="nav-item"
							onClick={() => {
								signout(() => {
									navigate("/");
								});
							}}
						>
							<Link
								
								className="nav-link text-light"
								to="#"
							>
								Signout
							</Link>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Menu;
