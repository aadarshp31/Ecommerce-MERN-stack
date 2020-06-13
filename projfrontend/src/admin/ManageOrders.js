import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { getAllOrders } from "../core/helper/orderHelper";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ManageOrders = () => {
	//States
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);

	const { user, token } = isAuthenticated();

	const preload = () => {
		setLoading(true);
		getAllOrders(user._id, token).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setOrders(data);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		preload();
    }, []);
    console.log(orders)

	//Loading Message
	const loadingMessage = () => {
		if (loading) {
			return (
				<div className="m-2 text-info">
					<h4 className="text-info">Loading...</h4>
				</div>
			);
		}
	};

	const showOrders = () => {
		return orders.map((order, index) => {
			return (
				<div key={index}>
					<div className="row text-center text-muted">
						<div className="col-8 pl-5">
							<h4 className="text-left" style={{ textTransform: "capitalize" }}>
								{order.transaction_id}
							</h4>
						</div>
						<div className="col-2">
							<Link
								className="btn btn-success rounded"
								to={`/admin/product/update/${order._id}`}
							>
								<span className="">Update</span>
							</Link>
						</div>
						<div className="col-2">
							<button onClick={() => {}} className="btn btn-danger rounded">
								Delete
							</button>
						</div>
					</div>
					<hr />
				</div>
			);
		});
	};

	return (
		<Base
			title="Manage Orders"
			description="Manage all orders here!"
			className="container bg-white rounded p-4"
		>
			<Link className="btn btn-info rounded" to={`/admin/dashboard`}>
				<span className="">Admin Home</span>
			</Link>
			<h2 className="mb-4 text-center">All Products</h2>
			<div className="row">
				<div className="col-12">
					<h4 className="text-left text-warning my-3">
						Total Orders: {orders.length}
					</h4>
					{showOrders()}
					{loadingMessage()}
				</div>
			</div>
		</Base>
	);
};

export default ManageOrders;
