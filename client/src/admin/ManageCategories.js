import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getAllCategories, deleteCategory } from "./helper/adminapicall";
import Loading from "../core/Loading";
import ErrorToast from "../core/ErrorToast";

const ManageProduct = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const { user, token } = isAuthenticated();

	const preload = () => {
		setLoading(true);
		getAllCategories()
		.then((data) => {
			setLoading(false);
			if (data.error) {
				setError(data.error);
				console.log(data.error);
			} else {
				setCategories(data);
			}
		})
		.catch(err => {
			console.log(err);
			setError(err);
			setLoading(false);
		})
	};

	useEffect(() => {
		preload();
	}, []);

	const deleteThisProduct = (categoryId) => {
		setLoading(true);
		deleteCategory(user._id, categoryId, token)
			.then((data) => {
				setLoading(false);
				if (data.error) {
				setError(data.error);
					console.log(data.error);
				} else {
					preload();
				}
			})
			.catch((err) => {
				console.log(err)
				setError(err);
				setLoading(false);
			});
	};

	return (
		<Base
			title="Manage Category Page"
			description="Manage product categories here"
			className="container bg-white rounded p-4"
		>
			<Link className="btn btn-info rounded" to={`/admin/dashboard`}>
				<span className="">Admin Home</span>
			</Link>
			<h2 className="mb-4 text-center">All Categories</h2>
			<Loading loading={loading} />
			<ErrorToast error={error} />
			<div className="row">
				<div className="col-12">
					<h4 className="text-left text-warning my-3">
						Total Categories: {categories.length}
					</h4>
					{categories.map((category, index) => {
						return (
							<div key={index}>
								<div className="row text-center text-muted">
									<div className="col-8 pl-5">
										<h4
											className="text-left"
											style={{ textTransform: "capitalize" }}
										>
											{category.name}
										</h4>
									</div>
									<div className="col-2">
										<Link
											className="btn btn-success rounded"
											to={`/category/${category._id}/${user._id}`}
										>
											<span className="">Update</span>
										</Link>
									</div>
									<div className="col-2">
										<button
											onClick={() => {
												deleteThisProduct(category._id);
											}}
											className="btn btn-danger rounded"
										>
											Delete
										</button>
									</div>
								</div>
								<hr />
							</div>
						);
					})}
				</div>
			</div>
		</Base>
	);
};

export default ManageProduct;
