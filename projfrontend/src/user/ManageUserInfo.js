import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getUser } from "./helper/userapicalls";
import { isAuthenticated } from "../auth/helper";

const ManageUserInfo = () => {
	const [userProfile, setUserProfile] = useState("");
	const [status, setStatus] = useState({
		loading: false,
		error: false,
		success: false,
	});
	const { user, token } = isAuthenticated();

	const preload = () => {
		setStatus({ loading: true });
		getUser(user._id, token).then((data) => {
			if (data.error) {
				setStatus({ loading: false, error: data.error });
			} else {
				setUserProfile(data);
				setStatus({ loading: true });
			}
		});
	};

	useEffect(() => {
		preload();
	}, []);

	return (
		<Base
			title="Manage User Details Page"
			description="Welcome to User Details Page"
			className="container bg-white p-4 rounded"
		>
			{
				<Link className="btn btn-info rounded" to={`/user/dashboard`}>
					<span>User Dashboard</span>
				</Link>
			}
		</Base>
	);
};

export default ManageUserInfo;
