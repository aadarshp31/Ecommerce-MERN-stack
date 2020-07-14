import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "../core/Base";
import Card from "./Card";
import { loadCart, createCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
import PaypalCheckout from "./PaypalCheckout";

const Cart = () => {
	const [products, setProducts] = useState([]);
	const [reload, setReload] = useState(false);

	useEffect(() => {
		createCart();
		setProducts(loadCart());
	}, [reload]);

	const loadAllProducts = () => {
		return (
			<div className="my-5">
				<h4>Products in your Cart</h4>
				<div className="d-flex flex-wrap justify-content-center justify-content-md-start">
				{products.map((product, index) => {
					return (
						<Card
							key={index}
							product={product}
							setReload={setReload}
							reload={reload}
						/>
					);
				})}
				</div>
			</div>
		);
	};
	const loadCheckout = () => {
		return (
			<div className="mx-auto">
				<h4>Checkout Section</h4>
				<hr/>
				<StripeCheckout
					products={products}
					setReload={setReload}
					reload={reload}
				/>
				<br />
				<PaypalCheckout
					products={products}
					setReload={setReload}
					reload={reload}
				/>
			</div>
		);
	};

	return (
		<Base title="Shopping Cart" description="Manage products in your cart here">
			<div className="container-fluid d-flex flex-column-reverse flex-md-row">
				<div style={{maxWidth: "70rem", minWidth: "40%"}}>
					{products.length > 0 ? (
						loadAllProducts()
					) : (
						<h6 className="text-warning">The Cart is Empty!</h6>
					)}
				</div>
				<div className="bg-light text-dark mx-auto p-3 my-5 rounded" style={{minWidth: "18rem", maxWidth: "30rem", maxHeight: "44rem"}}>{loadCheckout()}</div>
			</div>
		</Base>
	);
};

export default Cart;
