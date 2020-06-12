import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { clearCart } from "./helper/cartHelper";

const StripeCheckout = ({
	products,
	setReload = (f) => f,
	reload = undefined,
}) => {
	const initialValues = {
		loading: false,
		success: false,
		error: "",
		address: "",
	};
	const [data, setData] = useState(initialValues);
	const { user, token } = isAuthenticated();

	const getFinalAmount = () => {
		let amount = 0;
		products.map((p) => {
			amount += p.price * p.quantity;
		});
		return amount;
	};

	const makePayment = (token) => {
		const headers = {
			"Content-Type": "application/json",
		};
		const body = {
			token,
			products,
		};

		return fetch(`${API}/payment`, {
			method: "POST",
			headers,
			body: JSON.stringify(body),
		})
			.then((response) => {
				console.log(response);
				//!Call further methods like Create Order.

				//Clear cart and force reload
				clearCart(() => {
					setReload(!reload);
				});
			})
			.catch((err) => console.log(err));
	};

	const showStripeButton = () => {
		return isAuthenticated() && products.length > 0 ? (
			<StripeCheckoutButton
				stripeKey={process.env.REACT_APP_STRIPE_PK}
				token={makePayment}
				amount={getFinalAmount() * 100}
				name="Buy T-Shirt"
				shippingAddress
				billingAddress
			>
				<button className="btn btn-info rounded">Pay with Stripe</button>
			</StripeCheckoutButton>
		) : (
			<div>
				{!isAuthenticated() ? (
					<Link to="/signin">
						<button className="btn btn-warning rounded">Signin</button>
					</Link>
				) : (
					<h5 className="text-warning">Add an item to cart to continue</h5>
				)}
			</div>
		);
	};

	return (
		<div>
			<h4 className="text-white">
				Total Amount:{" "}
				<span className="badge badge-info text-white">{getFinalAmount()}</span>
			</h4>
			<br />
			<h4 className="text-white">Stripe Checkout</h4>
			{showStripeButton()}
		</div>
	);
};

export default StripeCheckout;
