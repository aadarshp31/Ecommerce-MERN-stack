import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const {
	user: { name, email, role },
} = isAuthenticated();

const adminLeftSide = () => {
	return (
		<div className="card">
			<h4 className="card-header bg-dark text-white">Admin Navigation</h4>
			<ul className="list-group">
				<li className="list-group-item">
					<Link to="/admin/create/category" className="nav-link text-success">
						Create Category
					</Link>
				</li>
				<li className="list-group-item">
					<Link to="/admin/create/product" className="nav-link text-success">
						Create Product
					</Link>
				</li>
				<li className="list-group-item">
					<Link to="/admin/products" className="nav-link text-success">
						Manage Products
					</Link>
				</li>
				<li className="list-group-item">
					<Link to="/admin/orders" className="nav-link text-success">
						Manage Orders
					</Link>
				</li>
			</ul>
		</div>
	);
};


const AdminDashboard = () => {
	return (
		<Base
			title="Welcome to Admin Dashboard"
			description="Manage all of your products here"
			className="container bg-success p-4"
		>
			<div className="row">
				<div className="col-3">{adminLeftSide()}</div>
			</div>
		</Base>
	);
};

export default AdminDashboard;
