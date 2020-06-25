import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { getUser, updateUser } from "./helper/userapicalls";
import { isAuthenticated } from "../auth/helper";

const ManageUserInfo = () => {
	//React Hooks
	const [userProfile, setUserProfile] = useState({
		name: "loading...",
		lastname: "loading...",
	});
	const [status, setStatus] = useState({
		loading: false,
		error: false,
		success: false,
	});
	const [disableControls, setDisableControls] = useState(false);

	//Destructuring
	const { user, token } = isAuthenticated();
	const { loading, error, success } = status;

	const preload = () => {
		setStatus({ ...status, loading: true });
		getUser(user._id, token)
			.then((data) => {
				if (data.error) {
					setStatus({ ...status, loading: false, error: data.error });
					setDisableControls(true);
				} else {
					setUserProfile(data);
					setStatus({ ...status, loading: false });
				}
			})
			.catch((err) => {
				setStatus({
					...status,
					error: "Failed to communicate with the backend.",
				});
				setUserProfile({
					...userProfile,
					name: "Error Occured",
					lastname: "Error Occured",
				});
				setDisableControls(true);
			});
	};

	useEffect(() => {
		preload();
	}, []);

	const { name, lastname, email } = userProfile;

	const handleChange = (inputValue) => (event) => {
		setStatus({ ...status, error: false, success: false });
		setUserProfile({ ...userProfile, [inputValue]: event.target.value });
	};

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
				<h4>{`${success}'s profile updated successfully`}</h4>
			</div>
		);
	};

	//Signup error message popup
	const errorMessage = () => {
		if (error) {
			return (
				<div className="alert alert-danger m-2 text-danger">
					<h4>User Info Updation Failed!</h4>
					<p>{error}</p>
				</div>
			);
		}
	};

	const formSubmit = (event) => {
		event.preventDefault();
		setStatus({ ...status, loading: true });
		updateUser(user._id, token, userProfile)
			.then((data) => {
				if (data.error) {
					setStatus({ ...status, error: data.error, loading: false });
				} else {
					setStatus({
						...status,
						success: data.name + " " + data.lastname,
						loading: false,
					});
				}
			})
			.catch((err) => {
				setStatus({
					...status,
					error: "Error communicationg with the backend.",
					loading: false,
				});
			});
	};

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
					disabled={disableControls}
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
					required
					disabled={disableControls}
				/>
			</div>
			<button
				className="btn btn-info rounded"
				onClick={formSubmit}
				disabled={disableControls}
			>
				Update Info
			</button>
		</form>
	);

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
