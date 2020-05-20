import React, {Fragment} from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper/index";

const currentTab = (history, path) => {
	if (history.location.pathname === path) {
		return { color: "#2ecc72" };
	} else {
		return { color: "#ffffff" };
	}
};

const Menu = (history) => (
	<div>
		<ul className="nav nav-tabs bg-dark">
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
			<li className="nav-item">
				<Link
					style={currentTab(history, "/user/dashboard")}
					className="nav-link"
					to="/user/dashboard"
				>
					Dashboard
				</Link>
			</li>
			<li className="nav-item">
				<Link
					style={currentTab(history, "/admin/dashboard")}
					className="nav-link"
					to="/admin/dashboard"
				>
					Admin Dashboard
				</Link>
			</li>
			
			{/* Returns Signin nav button when user is not authenticated, otherwise hides it from navbar */}
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
			{/* Returns Signout nav button when user is authenticated, otherwise hides it from navbar */}
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
