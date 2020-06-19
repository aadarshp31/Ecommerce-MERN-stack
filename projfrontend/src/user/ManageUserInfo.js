import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getUser } from "./helper/userapicalls";
import { isAuthenticated } from "../auth/helper";

const ManageUserInfo = () => {
	const [userProfile, setUserProfile] = useState({
		name: "",
		lastname: "",
		email: ""
	});
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
				setStatus({ loading: false });
			}
		});
	};

	useEffect(() => {
		preload();
	}, []);

	const { name, lastname, email } = userProfile;

	const handleChange = (inputValue) => (event) =>{
		setUserProfile(inputValue, event.target.value);
		setStatus({error: false, success: false});
		console.log(inputValue, " : ", event.target.value);
	}

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
					value={name}
					onChange={handleChange("name")}
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
					value={lastname}
					onChange={handleChange("lastname")}
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
					value={email}
					onChange={handleChange("email")}
					autoFocus
					required
				/>
			</div>
			<button className="btn btn-info rounded" onClick={() => {}}>
				Update Info
			</button>
		</form>
	);

	//Loading Message
	const loadingMessage = () => {
		if (loading) {
			return (
				<div className="alert alert-info m-2 text-info">
					<h4 className="text-info">Loading...</h4>
				</div>
			);
		}
	};

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

	//Signup error message popup
	const errorMessage = () => {
		if (error) {
			return (
				<div className="alert alert-danger m-2 text-danger">
					<h4>Product Updation Failed!</h4>
					<p>{error}</p>
				</div>
			);
		}
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
					{loadingMessage()}
					{successMessage()}
					{errorMessage()}
				</div>
			</div>
		</Base>
	);
};

export default ManageUserInfo;
