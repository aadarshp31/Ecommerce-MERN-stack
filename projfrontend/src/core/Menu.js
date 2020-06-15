import React, {Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper/index";

const currentTab = (history, path) => {
	if (history.location.pathname === path) {
		return { color: "#5bc0de" };
		// return { color: "#292b2c" };
	} else {
		return { color: "#ffffff" };
	}
};

const Menu = (history) => (
	<div style={{position: "fixed", width: "100vw", zIndex: "2"}}>
		<ul className="nav nav-expand bg-info p-2 font-weight-bold">
			<li className="nav-item">
				<Link style={currentTab(history, "/")} className="nav-link" to="/">
					Home
				</Link>
			</li>
			<li className="nav-item">
				<Link
					style={currentTab(history, "/cart")}
					className="nav-link"
					to="/cart"
				>
					Cart
				</Link>
			</li>
			
			{/* Displays/Returns Dashboard nav button when user is authenticated, otherwise hides it from navbar */}
			{isAuthenticated() && isAuthenticated().user.role === 0 && (
				<li className="nav-item">
				<Link
					style={currentTab(history, "/user/dashboard")}
					className="nav-link"
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
					style={currentTab(history, "/admin/dashboard")}
					className="nav-link"
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
					style={currentTab(history, "/signup")}
					className="nav-link"
					to="/signup"
				>
					Signup
				</Link>
				</li>
				<li className="nav-item">
					<Link
						style={currentTab(history, "/signin")}
						className="nav-link"
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
							history.history.push("/");
						});
					}}
				>
					<Link
						style={currentTab(history, "/signout")}
						className="nav-link text-warning"
						to=""
					>
						Signout
					</Link>
				</li>
			)}
		</ul>
	</div>
);

export default withRouter(Menu);
