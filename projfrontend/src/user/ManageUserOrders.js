import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getUserOrders } from "../core/helper/orderHelper";
import queryString from "query-string";
import Loading from "../core/Loading";
import ErrorToast from "../core/ErrorToast";

const ManageUserOrders = () => {
	//React Hooks
	const [orders, setOrders] = useState([]);
	const [status, setStatus] = useState({
		loading: false,
		error: false,
	});
	const [query, setQuery] = useState({
		sortBy: "createdAt",
		ascDesc: "desc",
		limit: 8,
		skip: 0,
	});

	//Desturcturing
	const { user, token } = isAuthenticated();
	const { loading, error } = status;
	const { sortBy, ascDesc, limit } = query;

	const preload = () => {
		setStatus({ ...status, loading: true });
		getUserOrders(user._id, token)
			.then((data) => {
				if (data.error) {
					setStatus({ ...status, loading: false, error: data.error });
				} else {
					setStatus({ ...status, loading: false });
					setOrders(data);
				}
			})
			.catch((err) => {
				setStatus({
					...status,
					loading: false,
					error: "Failed to communicate with backend",
				});
			});
	};

	useEffect(() => {
		preload();
	}, []);

	//Signup error message popup
	const errorMessage = () => {
		if (error) {
			return (
				<div className="alert alert-danger m-2 text-danger">
					<h4>Loading Orders Failed!</h4>
					<p>{error}</p>
				</div>
			);
		}
	};

		/* Filter Section START */

	//Handle Change
	const handleChange = (fieldName) => (e) => {
		setQuery({ ...query, [fieldName]: e.target.value });
	};

	//Filter
	const filter = () => {
		setStatus({ ...status, loading: true});
		const queryStringified = queryString.stringify(query);
		return getUserOrders(user._id, token, queryStringified)
			.then((data) => {
				if (data.error) {
					setStatus({ ...status, loading: false, error: data.error });
				} else {
					setOrders(data);
					setStatus({ ...status, loading: false });
				}
			})
			.catch((err) => {
				console.log(err);
				setStatus({ ...status, loading: false, error: err });
			});
	};

	const filterSection = () => {
		return (
			<div
				className="p-3 my-2 mx-auto bg-light text-dark rounded"
			>
				<div className="d-flex justify-content-around flex-column flex-md-row">
					<div>
						<label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
							Sort By
						</label>
						<select
							className="custom-select mr-sm-2"
							id="inlineFormCustomSelect"
							value={sortBy}
							onChange={handleChange("sortBy")}
						>
							<option value="createdAt">Order Date</option>
							<option value="amount">Amount</option>
						</select>
					</div>
					<div className="my-2 my-md-0">
						<label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
							Order
					</label>
						<select
							className="custom-select mr-sm-2"
							id="inlineFormCustomSelect"
							value={ascDesc}
							onChange={handleChange("ascDesc")}
						>
							<option value="asc">Ascending</option>
							<option value="desc">Descending</option>
						</select>
					</div>
					<div className="my-2 my-md-0">
						<label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
							Limit
						</label>
						<select
							className="custom-select mr-sm-2"
							id="inlineFormCustomSelect"
							value={limit}
							onChange={handleChange("limit")}
						>
							<option value="3">3</option>
							<option value="5">5</option>
							<option value="8">8</option>
							<option value="12">12</option>
							<option value="16">16</option>
							<option value="20">20</option>
						</select>
					</div>
					<button
						className="btn btn-info rounded mt-4 mt-md-auto"
						style={{ minWidth: "150px" }}
						onClick={filter}
					>
						Filter
					</button>
				</div>
			</div>
		);
	};

	/* Filter Section END */


	const showOrders = () => {
		return (
			<div className="accordion" id="accordionExample">
				{orders.map((order, index) => {
					var date = new Date(order.createdAt);
					return (
						<div className="card" key={index}>
							<div className="card-header" id="headingOne">
								<h2 className="mb-0">
									<button
										className={`btn btn-link btn-block text-left ${
											!(index === 0) ? "collapsed" : ""
											}`}
										type="button"
										data-toggle="collapse"
										data-target={"#colapse" + index}
										aria-expanded="false"
										aria-controls={"colapse" + index}
									>
										<span>
											{date.getDate().toString()}/
											{(date.getMonth() + 1).toString()}/
											{date.getFullYear().toString()}
										</span>
										<span className="d-none d-md-block">
											Products: {order.products.length}{" "}
										</span>
										<span className="d-none d-md-block">{order.status}</span>
										<span className="mr-auto">Amt: ₹{order.amount}</span>
										<i className="fas fa-angle-up card-icon"></i>
									</button>
								</h2>
							</div>
							<div
								id={"colapse" + index}
								className={`collapse ${index === 0 ? "show" : ""}`}
								aria-labelledby="headingOne"
								data-parent="#accordionExample"
							>
								<div className="card-body">
									<h6>
										Order Amount:{" "}
										<span className="text-info">₹{order.amount}</span>
									</h6>
									<h6>
										Order Status:{" "}
										<span className="text-info">{order.status}</span>
									</h6>
									<br />
									<h5>Products Purchased</h5>
									<div className="table-responsive">
										<table
											className="table table-hover"
											style={{ minWidth: "500px" }}
										>
											<caption>List of Products in the Order</caption>
											<thead>
												<tr className="bg-info text-white">
													<th scope="col" className="text-center">
														#
													</th>
													<th scope="col" className="text-center">
														Name
													</th>
													<th scope="col" className="text-center">
														Price
													</th>
													<th scope="col" className="text-center">
														Quantity
													</th>
													<th scope="col" className="text-center">
														Total Price
													</th>
												</tr>
											</thead>
											<tbody>
												{order.products.map((product, productIndex) => {
													return (
														<tr key={productIndex} className="text-center">
															<th scope="row">{productIndex + 1}</th>
															<td>{product.name}</td>
															<td>₹{product.price}</td>
															<td>{product.quantity || 1}</td>
															<td>
																₹{product.price * (product.quantity || 1)}
															</td>
														</tr>
													);
												})}
												<tr className="text-center table-info">
													<td>
														<strong>Grand Total</strong>
													</td>
													<td></td>
													<td></td>
													<td></td>
													<td>
														<strong>₹{order.amount}</strong>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
									<br />
									<h6>
										Transaction ID:{" "}
										<span className="text-info">{order.transaction_id}</span>
									</h6>
									<h6>
										Order ID:{" "}
										<span className="text-info">{order._id}</span>
									</h6>
									<h6>
										Order Date:{" "}
										<span className="text-info">{date.toString().split("GMT")[0]}</span>
									</h6>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<Base
			title="Manage Orders Page"
			description="Manage all your orders here!"
			className="container bg-white p-4 rounded"
		>
			{
				<Link className="btn btn-info rounded" to={`/user/dashboard`}>
					<span>User Dashboard</span>
				</Link>
			}
			<h2 className="my-4 text-center">Your Orders</h2>
			{filterSection()}
			<Loading loading={loading} />
			<ErrorToast error={error} />
			<div className="row">
				<div className="col-12">
					<h4 className="text-left my-3">
						Total Orders: <span className="text-info">{orders.length}</span>
					</h4>
					{orders.length > 0 ? showOrders() : ""}
					{errorMessage()}
				</div>
			</div>
		</Base>
	);
};

export default ManageUserOrders;
