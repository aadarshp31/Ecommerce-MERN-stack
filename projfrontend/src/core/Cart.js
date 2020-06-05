import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "../core/Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from  "./StripeCheckout"

const Cart = () => {
	const [products, setProducts] = useState([]);
	const [reload, setReload] = useState(false);

	useEffect(() => {
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
							addToCartButton={true}
							removeFromCartButton={true}
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
			<StripeCheckout products={products} setReload={setReload} reload={reload} />
		);
	};

	return (
		<Base title="Shopping Cart" description="Manage products in your cart here">
			<div className="row">
				<div className="col-6">{loadAllProducts()}</div>
				<div className="col-6">{loadCheckout()}</div>
			</div>
		</Base>
	);
};

export default Cart;
