import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { createCart, getQuantityFromCart } from "./helper/cartHelper";
import Loading from "./Loading";
import ErrorToast from "./ErrorToast";

const Home = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [reload, setReload] = useState(false);


	const loadAllProducts = () => {
		setLoading(true);
		return getProducts(new URLSearchParams({ limit: 30 }).toString())
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

	const productDisplay = () => {
		return (
			<div className="container-fluid d-flex flex-wrap justify-content-start">
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
		<Base title="Home Page" description="Welcome to the Ecommerce Store">
			{createCart()}
			<Loading loading={loading} />
			<ErrorToast error={error} />
			{/* <div className="container-fluid d-flex p-3 flex-column flex-md-row justify-content-md-center bg-danger"> */}
			<div className="container-fluid">
				{productDisplay()}
			</div>
			{getQuantityFromCart(products)}
		</Base>
	);
};

export default Home;
