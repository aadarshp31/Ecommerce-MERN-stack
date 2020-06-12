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
			<div>
				<h2>This section is for all products</h2>
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
		);
	};
	const loadCheckout = () => {
		return (
			<div>
				<h2 className="text-white">Checkout Section</h2>
				<hr className="bg-white" />
				<StripeCheckout
					products={products}
					setReload={setReload}
					reload={reload}
				/>
				<br />
				<PaypalCheckout products={products} setReload={setReload} reload={reload} />
			</div>
		);
	};

	return (
		<Base title="Shopping Cart" description="Manage products in your cart here">
			<div className="row">
				<div className="col-6">
					{products.length > 0 ? (
						loadAllProducts()
					) : (
						<h2 className="text-warning">The Cart is Empty!</h2>
					)}
				</div>
				<div className="col-6">{loadCheckout()}</div>
			</div>
		</Base>
	);
};

export default Cart;
