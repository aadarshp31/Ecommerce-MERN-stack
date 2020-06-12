import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import {
	addItemToCart,
	removeItemFromCart,
	updateCart,
	loadCart,
} from "./helper/cartHelper";
import { Redirect } from "react-router-dom";
import { getQuantityFromCart } from "./helper/cartHelper";

const Card = ({
	product,
	addToCartButton = false,
	removeFromCartButton = false,
	setReload = (f) => f,
    reload = undefined,
    products,
}) => {
	const cardTitle = product ? product.name : "A Photo from Pexels";
	const cardDescription = product ? product.description : "Product Description";
	const cardPrice = product ? product.price : "DEFAULT";

	const [redirect, setRedirect] = useState(false);

	const addToCart = () => {
		let cart = loadCart();

		//For empty Cart
		if (cart.length === 0) {
			product.quantity = 1;
			addItemToCart(product, () => setRedirect(true));
			//For non-empty Cart
		} else {
			let checkDuplicate = cart.filter((item) => item._id === product._id);
			//For duplicate Product
			if (checkDuplicate.length) {
				cart.map((item) => {
					if (item._id === product._id) {
						incQuantity();
					}
				});
				//For non-duplicate Product
			} else {
				product.quantity = 1;
				addItemToCart(product, () => setRedirect(true));
			}
		}
		setReload(!reload);
	};
	const removeFromCart = () => {
		removeItemFromCart(product._id);
		setReload(!reload);
	};

	const performRedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/cart" />;
		}
	};

	const showaddToCartButton = (addToCartButton) => {
		return (
			(addToCartButton || !product.quantity) && (
				<button className="btn btn-info btn-block rounded" onClick={addToCart}>
					Add to Cart
				</button>
			)
		);
	};

	const showremoveFromCartButton = (removeFromCartButton) => {
		return (
			(removeFromCartButton || product.quantity) && (
				<button
					className="btn btn-danger btn-block rounded"
					onClick={removeFromCart}
				>
					Remove from Cart
				</button>
			)
		);
	};

	//Handle product Quantity
	const incQuantity = () => {
		let cart = loadCart();
		cart.map((item) => {
			if (item._id === product._id) {
				item.quantity++;
				updateCart(cart);
                setReload(!reload);
                //*Updates quantity in homepage cards
                if(products) {
                    getQuantityFromCart(products);
                }
			}
		});
	};

	//Handle product Quantity
	const decQuantity = () => {
		let cart = loadCart();
		cart.map((item) => {
			if (item._id === product._id) {
				if (item.quantity > 1) {
					item.quantity--;
                    updateCart(cart);
                    //*Updates quantity in homepage cards
                    if(products) {
                        getQuantityFromCart(products);
                    }
				} else {
					removeFromCart();
				}
				setReload(!reload);
			}
		});
	};

	const showQuantityButton = () => {
		return product.quantity ? (
			<div className="mb-2">
				<p className="m-1">Quantity</p>
				{product.quantity > 0 ? (
					<button
						onClick={decQuantity}
						className="btn btn-danger mx-2 px-2 rounded"
						style={{ fontSize: "0.5rem" }}
					>
						-
					</button>
				) : (
					""
				)}
				<p style={{ display: "inline" }}>{product.quantity}</p>
				<button
					onClick={incQuantity}
					className="btn btn-success mx-2 px-2 rounded"
					style={{ fontSize: "0.5rem" }}
				>
					+
				</button>
			</div>
		) : (
			""
		);
	};

	return (
		<div className="card text-secondary mx-auto" style={{ width: "18rem" }}>
			<ImageHelper product={product} />
			<div className="card-body">
				<h5 className="card-title">{cardTitle}</h5>
				<p className="badge badge-secondary px-3 py-2">₹ {cardPrice}</p>
				<p className="card-text">{cardDescription}</p>
                {showQuantityButton()}
				{showaddToCartButton(addToCartButton)}
				{showremoveFromCartButton(removeFromCartButton)}
				{performRedirect(redirect)}
			</div>
		</div>
	);
};

export default Card;
