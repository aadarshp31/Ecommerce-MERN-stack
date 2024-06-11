import React from "react";
import ImageHelper from "./helper/ImageHelper";
import {
	addItemToCart,
	removeItemFromCart,
	updateCart,
	loadCart,
} from "./helper/cartHelper";
import { getQuantityFromCart } from "./helper/cartHelper";

const Card = ({
	product,
	addToCartButton = false,
	removeFromCartButton = false,
	setReload = (f) => f,
	reload = undefined,
	products,
}) => {
	const cardTitle = product ? product.title : "A Photo from Pexels";
	const cardDescription = product ? product.description : "Product Description";
	const cardPrice = product.price;
	// const cardRating = product ? `${product.rating.toFixed(1)}/5` : "--";
	const cardRating = product ? product.rating.toFixed(1) : null;
	const discountPercentage = product ? product.discountPercentage : null;


	const addToCart = () => {
		let cart = loadCart();

		//For empty Cart
		if (cart.length === 0) {
			product.quantity = 1;
			addItemToCart(product, () => { });
			//For non-empty Cart
		} else {
			let checkDuplicate = cart.filter((item) => item._id === product._id);
			//For duplicate Product
			if (checkDuplicate.length) {
				cart.forEach((item) => {
					if (item._id === product._id) {
						incQuantity();
					}
				});
				//For non-duplicate Product
			} else {
				product.quantity = 1;
				addItemToCart(product, () => { });
			}
		}
		setReload(!reload);
	};

	const removeFromCart = () => {
		removeItemFromCart(product._id, () => { });
		product.quantity = "";
		setReload(!reload);
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
		cart.forEach((item) => {
			if (item._id === product._id) {
				item.quantity++;
				updateCart(cart);
				setReload(!reload);
				//*Updates quantity in homepage cards
				if (products) {
					getQuantityFromCart(products);
				}
			}
		});
	};

	//Handle product Quantity
	const decQuantity = () => {
		let cart = loadCart();
		cart.forEach((item) => {
			if (item._id === product._id) {
				if (item.quantity > 1) {
					item.quantity--;
					updateCart(cart);
					//*Updates quantity in homepage cards
					if (products) {
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
				<p className="m-1" style={{ display: "inline" }}>
					Qty:
				</p>
				{product.quantity > 0 ? (
					<button
						onClick={decQuantity}
						className="btn btn-light mx-2 px-2 rounded"
						style={{ fontSize: "0.5rem" }}
					>
						<i className="fa fa-minus" aria-hidden="true"></i>
					</button>
				) : (
					""
				)}
				<p style={{ display: "inline" }}>
					<span className="badge badge-secondary">{product.quantity}</span>
				</p>
				<button
					onClick={incQuantity}
					className="btn btn-light mx-2 px-2 rounded"
					style={{ fontSize: "0.5rem" }}
				>
					<i className="fa fa-plus" aria-hidden="true"></i>
				</button>
			</div>
		) : (
			""
		);
	};

	function renderRatings(rating) {
		// return rating ? ("<span className=\"fa fa-star\"></span>".repeat(parseInt(rating))) : "--";
		if (!rating) return "--";
		const result = [];
		for (let i = 0; i < parseInt(rating); i++) {
			result.push(<span className="fa fa-star" key={i}></span>);
		}

		return result;
	}

	return (
		<div className="card text-secondary m-2" style={{ width: "14rem", cursor: "pointer", position: "relative" }}>
			{discountPercentage && discountPercentage > 5 && (<p className='badge-primary font-weight-bold' style={{position: "absolute", left: 0, top: 0, width: "6em", opacity: "80%", zIndex: 3}}>{discountPercentage}% off</p>)}
			<ImageHelper product={product} />
			<div className="card-body">
				<h6 className="card-title text-truncate text-dark font-weight-bold">{cardTitle}</h6>
				<p className="badge badge-success px-2 py-2">
				{cardRating} {renderRatings(cardRating)}
				</p>
				<h6 className="card-text font-weight-bold" style={{fontSize: "1.8rem"}}><sup style={{fontSize: "1.1rem"}}>₹</sup>{cardPrice}</h6>
			</div>
		</div>
	);
};

export default Card;
