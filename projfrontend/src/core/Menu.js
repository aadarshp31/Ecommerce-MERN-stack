import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper/index";

const currentTab = (history, path) => {
	if (history.location.pathname === path) {
		return "text-muted";
		// return { color: "#292b2c" };
	} else {
		return "text-light";
	}
};

const Menu = ({ history }) => (
	<nav className="navbar navbar-expand-lg navbar-dark bg-info fixed-top font-weight-bold gradient">
			<Link className="navbar-brand text-light" to="/">Ecommerce</Link>
				<button className="navbar-toggler text-white border-white" type="button" data-toggle="collapse" data-target="#navbarToggler">
					<span className="navbar-toggler-icon"></span>
				</button>
			<div className="collapse navbar-collapse" id="navbarToggler">
				<ul className="navbar-nav ml-auto mt-2 mt-lg-0 p-2 font-weight-bold">
					<li className="nav-item">
						<Link className={`nav-link ${currentTab(history, "/")}`} to="/">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link
							className={`nav-link ${currentTab(history, "/cart")}`}
							to="/cart"
						>
							Cart
						</Link>
					</li>

					{/* Displays/Returns Dashboard nav button when user is authenticated, otherwise hides it from navbar */}
					{isAuthenticated() && (
						<li className="nav-item">
							<Link
								className={`nav-link ${currentTab(history, "/user/dashboard")}`}
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
								className={`nav-link ${currentTab(history, "/admin/dashboard")}`}
								to="/admin/dashboard"
							>
								Admin Dashboard
							</Link>
						</li>
					)}

					{/* Displays/Returns Signin nav button when user is not authenticated, otherwise hides it from navbar */}
					{!isAuthenticated() && (
						<Fragment>
							<li className="nav-item">
								<Link
									className={`nav-link ${currentTab(history, "/signup")}`}
									to="/signup"
								>
									Signup
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className={`nav-link ${currentTab(history, "/signin")}`}
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
									history.push("/");
								});
							}}
						>
							<Link
								
								className="nav-link text-light"
								to=""
							>
								Signout
							</Link>
						</li>
					)}
				</ul>
			</div>
	</nav>
);

export default withRouter(Menu);
