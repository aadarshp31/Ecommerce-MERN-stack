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
		</Base>
	);
};

export default ManageUserOrders;
