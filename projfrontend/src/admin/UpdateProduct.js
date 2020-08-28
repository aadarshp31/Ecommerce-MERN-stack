import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import {
	getProduct,
	updateProduct,
	getAllCategories,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
import Loading from "../core/Loading";
import ErrorToast from "../core/ErrorToast";

const UpdateProduct = ({ match, history }) => {
	//Getting Token and User data from the client's browser localStorage
	const { token, user } = isAuthenticated();

	//Initial States for the Signup component
	const initialValues = {
		name: "",
		description: "",
		price: "",
		category: "",
		stock: "",
		photo: "",
		loading: "",
		error: "",
		createdProduct: "",
		formData: "",
		didRedirect: "",
	};

	//States for Signup component
	const [values, setValues] = useState(initialValues);
	const [categories, setCategories] = useState([])

	//Destructuring the states of the Signup component
	const {
		name,
		description,
		category,
		price,
		stock,
		loading,
		error,
		createdProduct,
		formData,
		didRedirect,
	} = values;

	const preloadCategories = () => {
		setValues({ ...values, error: false, loading: true });
		getAllCategories()
			.then((data) => {
				setValues({ ...values, loading: false });
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					setCategories(data);
				}
			})
			.catch((err) => {
				setValues({ ...values, error: err, loading: false });
				console.log(err);
			});
	};

	//Method to preload the category list after rendering of the Create Product Page
	const preload = (productId) => {
		setValues({ ...values, error: false, loading: true });
		preloadCategories();
		getProduct(productId).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
			} else {
				setValues({
					...values,
					name: data.name,
					description: data.description,
					category: data.category._id,
					price: data.price,
					stock: data.stock,
					formData: new FormData(),
					loading: false,
				});
			}
		});
	};

	//useEffect renders runs the preLoad method after the rendering of all of the Create Product Page components
	useEffect(() => {
		preload(match.params.productId);
	}, []);

	//Redirect with a delay of 2 seconds after successful product creation.
	const performRedirect = () => {
		if (didRedirect) {
			setTimeout(() => {
				history.push("/admin/products");
			}, 2000);
		}
	};

	//Sets data in the states according to the input fields
	const handleChange = (inputValue) => (event) => {
		const value =
			inputValue === "photo" ? event.target.files[0] : event.target.value;
		formData.set(inputValue, value);
		setValues({ ...values, error: false, [inputValue]: value });
	};

	const formSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		updateProduct(user._id, match.params.productId, token, formData)
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, loading: false });
				} else {
					setValues({
						...initialValues,
						loading: false,
						createdProduct: data.name,
						didRedirect: true,
					});
				}
			})
			.catch((err) => {
				setValues({ ...values, error: err, loading: false });
				console.log(err);
			});
	};

	//Success Message
	const successMessage = () => {
		return (
			<div
				className="alert alert-success m-2 text-success"
				style={{ display: createdProduct ? "" : "none" }}
			>
				<h4>{`${createdProduct}: Product Updated successfully`}</h4>
			</div>
		);
	};

	const redirectingMessage = () => {
		if (didRedirect) {
			return (
				<div className="m-2 text-info">
					<h4 className="text-info">Redirecting to Manage Product Page...</h4>
				</div>
			);
		}
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

	const goBackButton = () => {
		return (
			<div>
				<Link className="btn btn-info rounded" to="/admin/dashboard">
					Admin Home
				</Link>
			</div>
		);
	};

	const updateProductForm = () => {
		return (
			<form>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<label className="input-group-text">Name</label>
					</div>
					<input
						type="text"
						className="form-control"
						placeholder="Name"
						autoFocus
						required
						onChange={handleChange("name")}
						value={name}
					/>
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<label className="input-group-text">Description</label>
					</div>
					<input
						type="text"
						className="form-control"
						placeholder="Description"
						required
						onChange={handleChange("description")}
						value={description}
					/>
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<label className="input-group-text">Category</label>
					</div>
					<select
						className="form-control"
						placeholder="Category"
						style={{ textTransform: "capitalize" }}
						required
						onChange={handleChange("category")}
						value={category}
					>
						<option>Select</option>
						{categories &&
							categories.map((category, index) => {
								return (
									<option
										key={index}
										value={category._id}
										style={{ textTransform: "capitalize" }}
									>
										{category.name}
									</option>
								);
							})}
					</select>
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<label className="input-group-text">Price</label>
					</div>
					<input
						type="number"
						className="form-control"
						placeholder="Price"
						required
						onChange={handleChange("price")}
						value={price}
					/>
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<label className="input-group-text">Quantity</label>
					</div>
					<input
						type="number"
						className="form-control"
						placeholder="Quantity"
						required
						onChange={handleChange("stock")}
						value={stock}
					/>
				</div>
				<div className="input-group mb-3">
					<div className="input-group-prepend">
						<label className="input-group-text">Product Photo</label>
					</div>
					<input
						className="btn btn-outline-info"
						type="file"
						name="photo"
						accept="image"
						onChange={handleChange("photo")}
					/>
				</div>
				<button className="btn btn-info rounded" onClick={formSubmit}>
					Update Product
				</button>
			</form>
		);
	};

	return (
		<Base
			title="Update Product Page"
			description="Update Product Information"
			className="container bg-white rounded p-4"
		>
			<div className="row rounded">
				<div className="col-md-2">{goBackButton()}</div>
				<div className="col-md-8 my-3">
					<h2 className="mb-4 text-center">Update Product</h2>
					<Loading loading={loading} />
					<ErrorToast error={error} />
					{updateProductForm()}
					{successMessage()}
					{errorMessage()}
					{redirectingMessage()}
					{performRedirect()}
				</div>
			</div>
		</Base>
	);
};

export default UpdateProduct;
