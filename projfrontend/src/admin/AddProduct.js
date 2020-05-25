import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { createProduct, getAllCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";
const AddProduct = () => {
	//Getting Token and User data from the client's browser localStorage
	const { token, user } = isAuthenticated();

	//Initial States for the Signup component
	const initialValues = {
		name: "",
		description: "",
		price: "",
		categories: [],
		category: "",
		stock: "",
		photo: "",
		loading: "",
		error: "",
		createdProduct: "",
		formData: "",
	};

	//States for Signup component
	const [values, setValues] = useState(initialValues);

	//Destructuring the states of the Signup component
	const {
		name,
		description,
		price,
		categories,
		stock,
		photo,
		loading,
		error,
		createdProduct,
		formData,
	} = values;

	const preload = () => {
		getAllCategories().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({ ...values, categories: data, formData: new FormData() });
			}
		});
	};

	useEffect(() => {
		preload();
		return(() => {
			setValues({...values, categories: []})
		})
	}, [categories]);

	//Sets data in the states according to the input fields
	const handleChange = (inputValue) => (event) => {
		const value = inputValue === "photo" ? event.target.files[0] : event.target.value;
		formData.set(inputValue, value);
		setValues({ ...values, error: false, [inputValue]: value });
	};

	const formSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		createProduct(user._id, token, formData)
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, loading: false });
				} else {
					setValues({
						...initialValues,
						loading: false,
						createdProduct: data.name,
					});
				}
			})
			.catch((err) => console.log(err));
	};

	//Success Message
	const successMessage = () => {
		return (
			<div className="alert alert-success" style={{display: createdProduct ? "" : "none"}}>
				<h4 className="text-success">{`${createProduct}: Product Added successfully`}</h4>
			</div>
		);
	};

	//Loading Message
	const loadingMessage = () => {
		if (loading) {
			return <h4 className="text-warning">Loading...</h4>;
		}
	};

	//Signup error message popup
	const errorMessage = () => {
		if (error) {
			return (
				<div className="text-danger">
					<h4>Product Creation Failed!</h4>
					<p>{error}</p>
				</div>
			);
		}
	};

	const goBackButton = () => {
		return (
			<div>
				<Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
					Admin Dashboard
				</Link>
			</div>
		);
	};

	const addProductForm = () => {
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
						style={{textTransform: "capitalize"}}
						required
						onChange={handleChange("category")}
					>
						<option value="a">Select</option>
						{categories &&
							categories.map((category, index) => {
								return (
									<option key={index} value={category._id} style={{textTransform: "capitalize"}}>
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
						required
						onChange={handleChange("photo")}
						value={photo}
					/>
				</div>
				<button className="btn btn-info" onClick={formSubmit}>
					Create Product
				</button>
			</form>
		);
	};

	return (
		<Base
			title="Create Product Page"
			description="Add a new product into your collection"
			className="container bg-white rounded p-4"
		>
			<div className="row rounded">
				<div className="col-md-2">{goBackButton()}</div>
				<div className="col-md-8 my-3">
					{addProductForm()}
					{loadingMessage()}
					{successMessage()}
					{errorMessage()}
				</div>
			</div>
		</Base>
	);
};

export default AddProduct;
