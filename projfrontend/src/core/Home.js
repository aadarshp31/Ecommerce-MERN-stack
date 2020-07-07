import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "../core/Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { createCart, getQuantityFromCart } from "./helper/cartHelper";

const Home = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(false);
	const [reload, setReload] = useState(false);

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

	return (
		<Base title="Home Page" description="Welcome to the Tshirt Store">
			{createCart()}
			<h1 className="text-white mx-auto mb-5">All T-Shirts</h1>
			<div className="container-fluid d-flex p-3 flex-column flex-md-row justify-content-md-center">
				<div
					className="p-3 mt-2 mx-auto align-items-center justify-content-between bg-light text-dark rounded"
					style={{ width: "18rem", height: "18rem" }}
				>
					<div>
						<h4>Filter/Sort</h4>
						<label className="mr-sm-2" for="inlineFormCustomSelect">
							Sort By
						</label>
						<select
							className="custom-select mr-sm-2"
							id="inlineFormCustomSelect"
						>
							<option value="asc" selected>
								Name
							</option>
							<option value="desc">Price</option>
						</select>
					</div>
					<div className="">
						<label className="mr-sm-2" for="inlineFormCustomSelect">
							Order
						</label>
						<select
							className="custom-select mr-sm-2"
							id="inlineFormCustomSelect"
						>
							<option value="asc" selected>
								Ascenting
							</option>
							<option value="desc">Descending</option>
						</select>
					</div>
					<div className="">
						<label className="mr-sm-2" for="inlineFormCustomSelect">
							Limit
						</label>
						<select
							className="custom-select mr-sm-2"
							id="inlineFormCustomSelect"
						>
							<option value="8" selected>
								8
							</option>
							<option value="12">12</option>
							<option value="16">16</option>
							<option value="20">20</option>
						</select>
					</div>
				</div>
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
			</div>
			{getQuantityFromCart(products)}
		</Base>
	);
};

export default Home;
