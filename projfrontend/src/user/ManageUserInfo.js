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
	const { loading, error, success } = status;

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

	const userInfoForm = () => (
		<form>
			<div className="input-group mb-3">
				<div className="input-group-prepend">
					<label className="input-group-text">First Name</label>
				</div>
				<input
					type="text"
					className="form-control"
					placeholder="First Name"
					autoFocus
					required
				/>
			</div>
			<div className="input-group mb-3">
				<div className="input-group-prepend">
					<label className="input-group-text">Last Name</label>
				</div>
				<input
					type="text"
					className="form-control"
					placeholder="Last Name"
					autoFocus
					required
				/>
			</div>
			<div className="input-group mb-3">
				<div className="input-group-prepend">
					<label className="input-group-text">Email ID</label>
				</div>
				<input
					type="email"
					className="form-control"
					placeholder="Name"
					autoFocus
					required
				/>
			</div>
			<button className="btn btn-info" onClick={() => {}}>
				Update Info
			</button>
		</form>
	);

	//Success Message
	const successMessage = () => {
		return (
			<div
				className="alert alert-success m-2 text-success"
				style={{ display: success ? "" : "none" }}
			>
				<h4>{`${success}: Product Added successfully`}</h4>
			</div>
		);
	};

	return (
		<Base
			title="Manage User Details Page"
			description="Welcome to User Details Page"
			className="container bg-white p-4 rounded"
		>
			{
				<Link className="btn btn-info rounded mb-4" to={`/user/dashboard`}>
					<span>User Dashboard</span>
				</Link>
			}
			<div className="row p-2">
				<div className="container-fluid mx-auto" style={{ width: "70%" }}>
					{userInfoForm()}
					{successMessage()}
				</div>
			</div>
		</Base>
	);
};

export default ManageUserInfo;
