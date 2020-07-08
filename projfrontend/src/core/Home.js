import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "../core/Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { createCart, getQuantityFromCart } from "./helper/cartHelper";
import queryString from "query-string";

const Home = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(false);
	const [reload, setReload] = useState(false);
	const [query, setQuery] = useState({
		sortBy: "name",
		ascDesc: "asc",
		limit: "8",
	});

	//destructuring
	const { sortBy, ascDesc, limit } = query;

	const loadAllProducts = () => {
		return getProducts()
			.then((data) => {
				if (data.error) {
					setError(data.error);
				} else {
					setProducts(data);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		loadAllProducts();
	}, []);

	//Handle Change
	const handleChanege = (fieldName) => (e) => {
		setQuery({ ...query, [fieldName]: e.target.value });
	};

	//Filter
	const filter = () => {
		const queryStringified = queryString.stringify(query);
		return getProducts(queryStringified)
			.then((data) => {
				if (data.error) {
					setError(data.error);
				} else {
					setProducts(data);
				}
			})
			.catch((err) => console.log(err));
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
						onChange={handleChanege("sortBy")}
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
						onChange={handleChanege("ascDesc")}
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
						onChange={handleChanege("limit")}
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

	const productDisplay = () => {
		return (
			<div className="container-fluid d-flex flex-wrap justify-content-center justify-content-md-start">
				{products.map((product, index) => {
					return (
						<div key={index} className="m-2">
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
			<div className="container-fluid d-flex p-3 flex-column flex-md-row justify-content-md-center">
				{filterSection()}
				{productDisplay()}
			</div>
			{getQuantityFromCart(products)}
		</Base>
	);
};

export default Home;
