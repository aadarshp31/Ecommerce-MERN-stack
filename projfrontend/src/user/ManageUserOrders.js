import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getUserOrders } from "../core/helper/orderHelper";
import "../styles.css"
const ManageUserOrders = () => {
	const [orders, setOrders] = useState([]);
	const [status, setStatus] = useState({
		loading: false,
		error: false,
	});
	const { user, token } = isAuthenticated();

	const preload = () => {
		setStatus({ ...status, loading: true });
		getUserOrders(user._id, token)
			.then((data) => {
				if (data.error) {
					setStatus({ ...status, loading: false, error: data.error });
				} else {
					setStatus({ ...status, loading: false });
					setOrders(data);
					console.log(data)
				}
			})
			.catch((err) => {
				setStatus({ ...status, loading: false, error: err });
			});
	};

	useEffect(() => {
		preload();
	}, []);

	return (
		<Base
			title="Manage Orders Page"
			description="Manage all your orders here!"
			className="container bg-white p-4 rounded"
		>
			{
				<Link className="btn btn-info rounded mb-4" to={`/user/dashboard`}>
					<span>User Dashboard</span>
				</Link>
			}

			<div className="accordion" id="accordionExample">
				{orders.map((order, index) => {
					var date = new Date(order.createdAt)
					return (
						<div className="card" key={index}>
							<div className="card-header" id="headingOne">
								<h2 className="mb-0">
									<button
										className="btn btn-link btn-block text-left collapsed"
										type="button"
										data-toggle="collapse"
										data-target={"#" + "colapse" + index}
										aria-expanded="false"
										aria-controls={"colapse" + index}
									>
										<div className="collapsable-card-header">
											<span>Date: {date.getDate().toString()} / {(date.getMonth() + 1).toString()} / {date.getFullYear().toString()}</span>
											<span>Products: {order.products.length} </span>
											<span>Status: {order.status}</span>
											<span>Amount: {order.amount}</span>
											<i className="fas fa-angle-up card-icon"></i>
										</div>
									</button>
								</h2>
							</div>
							<div
								id={"colapse" + index}
								className="collapse"
								aria-labelledby="headingOne"
								data-parent="#accordionExample"
							>
								<div className="card-body">
									<h6 className="badge badge-success p-3">Order Amount: {order.amount}</h6>
									<h6>Status: <span className="text-success">{order.status}</span></h6>
									<h6>Transaction ID: <span className="text-success">{order.transaction_id}</span></h6>
									<br/>
									<h5>Products Purchased</h5>
									<table className="table table-striped">
										<thead>
											<tr  className="bg-info text-white">
												<th scope="col" className="text-center">#</th>
												<th scope="col" className="text-center">Name</th>
												<th scope="col" className="text-center">Price</th>
												<th scope="col" className="text-center">Quantity</th>
												<th scope="col" className="text-center">Total Price</th>
											</tr>
										</thead>
										<tbody>
											{order.products.map((product, productIndex) => {
												return(
													<tr key={productIndex} className="text-center">
														<th scope="row">{productIndex + 1}</th>
														<td>{product.name}</td>
														<td>{product.price}</td>
														<td>{product.quantity || 1}</td>
														<td>{product.price * (product.quantity || 1)}</td>
													</tr>
												);
											})}
													<tr className="text-center table-success">
														<td><strong>Grand Total</strong></td>
														<td></td>
														<td></td>
														<td></td>
														<td><strong>{order.amount}</strong></td>
													</tr>
										</tbody>
									</table>
									<br/>
									<h6>Order Date: <span className="text-success">{date.toString()}</span></h6>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</Base>
	);
};

export default ManageUserOrders;
