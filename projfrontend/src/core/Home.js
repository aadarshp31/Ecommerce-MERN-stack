import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "../core/Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { createCart, getQuantityFromCart } from "./helper/cartHelper";
import queryString from "query-string";
import Loading from "./Loading";
import ErrorToast from "./ErrorToast";

const Home = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [reload, setReload] = useState(false);
	const [query, setQuery] = useState({
		sortBy: "name",
		ascDesc: "asc",
		limit: 8,
		skip: 0
	});

	//destructuring
	const { sortBy, ascDesc, limit } = query;

	const loadAllProducts = () => {
		setLoading(true);
		return getProducts()
			.then((data) => {
				setLoading(false);
				if (data.error) {
					setError(data.error);
				} else {
					setProducts(data);
				}
			})
			.catch((err) => {
				console.log(err);
				setError(err);
				setLoading(false);
			});
	};

	useEffect(() => {
		loadAllProducts();
	}, []);

	/* Filter Section START */

	//Handle Change
	const handleChange = (fieldName) => (e) => {
		setQuery({ ...query, [fieldName]: e.target.value });
	};

	//Filter
	const filter = () => {
		const queryStringified = queryString.stringify(query);
		setLoading(true);
		return getProducts(queryStringified)
			.then((data) => {
				setLoading(false);
				if (data.error) {
					setError(data.error);
				} else {
					setProducts(data);
				}
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);	
			});
	};

	const filterSection = () => {
		return (
			<div
				className="p-3 mt-2 mx-auto align-items-center justify-content-between bg-light text-dark rounded"
				style={{ width: "18rem", height: "20rem" }}
			>
				<div>
					<h4>Filter/Sort</h4>
					<label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
						Sort By
					</label>
					<select
						className="custom-select mr-sm-2"
						id="inlineFormCustomSelect"
						value={sortBy}
						onChange={handleChange("sortBy")}
					>
						<option value="name">Name</option>
						<option value="price">Price</option>
					</select>
				</div>
				<div className="">
					<label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
						Order
					</label>
					<select
						className="custom-select mr-sm-2"
						id="inlineFormCustomSelect"
						value={ascDesc}
						onChange={handleChange("ascDesc")}
					>
						<option value="asc">Ascending</option>
						<option value="desc">Descending</option>
					</select>
				</div>
				<div className="">
					<label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
						Limit
					</label>
					<select
						className="custom-select mr-sm-2"
						id="inlineFormCustomSelect"
						value={limit}
						onChange={handleChange("limit")}
					>
						<option value="3">3</option>
						<option value="5">5</option>
						<option value="8">8</option>
						<option value="12">12</option>
						<option value="16">16</option>
						<option value="20">20</option>
					</select>
					<button
						className="btn btn-block btn-info my-2 rounded"
						onClick={filter}
					>
						Filter
					</button>
				</div>
			</div>
		);
	};

	/* Filter Section END */

	const productDisplay = () => {
		return (
			<div className="container-fluid d-flex flex-wrap justify-content-center justify-content-md-start">
				{products.map((product, index) => {
					return (
						<div key={index}>
							<Card
								product={product}
								products={products}
								setReload={setReload}
								reload={reload}
							/>
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<Base title="Home Page" description="Welcome to the Tshirt Store">
			{createCart()}
			<h1 className="text-white mx-auto mb-5">All T-Shirts</h1>
			<Loading loading={loading} />
			<ErrorToast error={error} />
			<div className="container-fluid d-flex p-3 flex-column flex-md-row justify-content-md-center">
				{filterSection()}
				{productDisplay()}
			</div>
			{getQuantityFromCart(products)}
		</Base>
	);
};

export default Home;
