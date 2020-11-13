import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import { getCategory, updateCategory } from "./helper/adminapicall";
import Loading from "../core/Loading";
import ErrorToast from "../core/ErrorToast";

const UpdateCategory = ({ match, history }) => {
	const [name, setName] = useState("");
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [didRedirect, setDidRedirect] = useState(false);

	//Getting token and user information from localStorage of client's browser
	const { token, user } = isAuthenticated();

	const goBackButton = () => {
		return (
			<div>
				<Link className="btn btn-info rounded" to="/admin/dashboard">
					Admin Home
				</Link>
			</div>
		);
	};

	//Sets data in the states according to the input fields
	const handleChange = (event) => {
		setName(event.target.value);
		setError(false);
		setSuccess(false);
	};

	const preload = (categoryId) => {
		setLoading(true);
		getCategory(categoryId)
			.then((data) => {
				if (data.error) {
					setError(data.error);
				} else {
					setName(data.name);
					setLoading(false);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		preload(match.params.categoryId);
	}, [match.params.categoryId]);

	//Submits the UpdateCatgory form and gets the response from the backend
	const formSubmit = (event) => {
		event.preventDefault();
		setError("");
		setLoading(true);
		setSuccess(false);

		//Backend request fired
		updateCategory(user._id, match.params.categoryId, token, { name })
			.then((data) => {
				if (data.error) {
					setError(data.error);
				} else {
					setError("");
					setLoading(false);
					setSuccess(true);
					setDidRedirect(true);
				}
			})
			.catch((err) => console.log("Error in formSubmit!", err));
	};

	//Success message popup
	const successMessage = () => {
		if (success) {
			return <h4 className="text-success">Collection Updated Successfully</h4>;
		}
	};

	const redirectingMessage = () => {
		if (didRedirect) {
			return (
				<div className="text-info">
					<h4 className="text-info">
						Redirecting to Manage Categories Page...
					</h4>
				</div>
			);
		}
	};

	const performRedirect = () => {
		if (didRedirect) {
			setTimeout(() => {
				history.push("/admin/categories");
			}, 2000);
		}
	};

	//Update Category form component
	const addCategoryForm = () => {
		return (
			<form>
				<div className="form-group">
					<label className="lead">Enter Category Name</label>
					<input
						type="text"
						className="form-control my-3"
						autoFocus
						placeholder="For Ex. Summer"
						onChange={handleChange}
						value={name}
						required
					/>
					<button onClick={formSubmit} className="btn btn-info">
						Update Category
					</button>
				</div>
			</form>
		);
	};

	return (
		<Base
			title="Update a Category"
			description="Update a product category for TShirts"
			className="container bg-white rounded p-4"
		>
			<Loading loading={loading} />
			<ErrorToast error={error} />
			<div className="row rounded">
				<div className="col-md-2">{goBackButton()}</div>
				<div className="col-md-8 my-3">
					{addCategoryForm()}
					{successMessage()}
					{redirectingMessage()}
					{performRedirect()}
				</div>
			</div>
		</Base>
	);
};

export default UpdateCategory;
