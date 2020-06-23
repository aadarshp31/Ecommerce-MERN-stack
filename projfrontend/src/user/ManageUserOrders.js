import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getUserOrders } from "../core/helper/orderHelper";

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
										Collapsible Group Item #1
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
									<table className="table table-striped">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">First</th>
												<th scope="col">Last</th>
												<th scope="col">Handle</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<th scope="row">1</th>
												<td>Mark</td>
												<td>Otto</td>
												<td>@mdo</td>
											</tr>
											<tr>
												<th scope="row">2</th>
												<td>Jacob</td>
												<td>Thornton</td>
												<td>@fat</td>
											</tr>
											<tr>
												<th scope="row">3</th>
												<td>Larry</td>
												<td>the Bird</td>
												<td>@twitter</td>
											</tr>
										</tbody>
									</table>
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
