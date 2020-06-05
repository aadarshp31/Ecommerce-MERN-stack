import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";


const AdminDashboard = () => {

	
const {
	user: { name, email },
} = isAuthenticated();

const adminLeftSide = () => {
	return (
		<div className="card">
			<h4 className="card-header bg-info text-white">Admin Navigation</h4>
			<ul className="list-group">
				<li className="list-group-item">
					<Link to="/admin/create/category" className="nav-link text-secondary">
						Create Category
					</Link>
				</li>
				<li className="list-group-item">
					<Link to="/admin/categories" className="nav-link text-secondary">
						Manage Categories
					</Link>
				</li>
				<li className="list-group-item">
					<Link to="/admin/create/product" className="nav-link text-secondary">
						Create Product
					</Link>
				</li>
				<li className="list-group-item">
					<Link to="/admin/products" className="nav-link text-secondary">
						Manage Products
					</Link>
				</li>
				<li className="list-group-item">
					<Link to="/admin/orders" className="nav-link text-secondary">
						Manage Orders
					</Link>
				</li>
			</ul>
		</div>
	);
};

const adminRightSide = () => {
	return(
		<div className="card mb-4">
			<h4 className="card-header bg-info text-white">Admin Information</h4>
			<ul className="list-group">
				<li className="list-group-item">
					<span className="badge badge-success mr-2">Name:</span> {name}
				</li>
				<li className="list-group-item">
					<span className="badge badge-success mr-2">Email:</span> {email}
				</li>
				<li className="list-group-item">
					<span className="badge badge-danger mr-2">Admin Privilege</span>
				</li>
			</ul>
		</div>
	);
}

	return (
		<Base
			title="Welcome to Admin Dashboard"
			description="Manage all of your products here"
			className="container bg-white p-4 rounded"
		>
			<div className="row">
				<div className="col-3">{adminLeftSide()}</div>
				<div className="col-9">{adminRightSide()}</div>
			</div>
		</Base>
	);
};

export default AdminDashboard;
