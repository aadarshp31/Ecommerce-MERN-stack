import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";

const UserDashboard = () => {
	const {
		user: { name, lastname, email },
	} = isAuthenticated();

	const userLeftSide = () => {
		return (
			<div className="card">
				<h4 className="card-header bg-info text-white">User Navigation</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<Link to="/user/user-info" className="nav-link text-secondary">
							Manage User Details
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/user/orders" className="nav-link text-secondary">
							Manage Orders
						</Link>
					</li>
					<li className="list-group-item">
						<Link to="/user/password-reset" className="nav-link text-secondary">
							Change Password
						</Link>
					</li>
					{/* <li className="list-group-item">
						<Link to="/user/email-update" className="nav-link text-secondary">
							Change Email
						</Link>
					</li> */}
					{/* <li className="list-group-item">
						<Link to="/user/orders" className="nav-link text-secondary">
							Manage Orders
						</Link>
					</li> */}
				</ul>
			</div>
		);
	};

	const userRightSide = () => {
		return (
			<div className="card">
				<h4 className="card-header bg-info text-white">User Information</h4>
				<ul className="list-group text-secondary">
					<li className="list-group-item">
						<span className="badge badge-success mr-2">Name:</span>
						<span style={{ textTransform: "capitalize" }}>
							{name + " " + lastname !== undefined ? lastname : ""}
						</span>
					</li>
					<li className="list-group-item">
						<span className="badge badge-success mr-2">Email:</span>
						<span style={{ textTransform: "lowercase" }}>{email}</span>
					</li>
					<li className="list-group-item">
						<span className="badge badge-success mr-2">Address:</span>
						PlaceHolder Address
					</li>
				</ul>
			</div>
		);
	};

	return (
		<Base
			title="User Dashboard Page"
			description="Welcome to User Dashboard Page"
			className="container bg-white p-4 rounded"
		>
			<div className="row flex-column-reverse flex-md-row justify-content-start">
				<div className="col-md-4 my-1">{userLeftSide()}</div>
				<div className="col-md-8 my-1">{userRightSide()}</div>
			</div>
		</Base>
	);
};

export default UserDashboard;
