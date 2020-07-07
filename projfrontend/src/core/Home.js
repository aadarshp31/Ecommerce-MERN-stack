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
			<div className="container p-1 d-flex flex-wrap justify-content-start">
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
			{getQuantityFromCart(products)}
		</Base>
	);
};

export default Home;
