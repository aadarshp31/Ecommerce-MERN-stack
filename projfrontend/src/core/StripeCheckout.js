import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";
import { clearCart } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";

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
	const { user, token: authToken } = isAuthenticated();

	const getFinalAmount = () => {
		let amount = 0;
		products.map((p) => {
			amount += p.price * p.quantity;
		});
		return amount;
	};

	const processPayment = (token) => {
		const headers = {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${authToken}`,
		};
		const body = {
			token,
			products,
		};

		return fetch(`${API}/payment/stripe/${user._id}`, {
			method: "POST",
			headers,
			body: JSON.stringify(body),
		})
			.then((response) => response.json())
			.then((data) => {
				const orderData = {
					products: products,
					transaction_id: data.id,
					amount: data.amount / 100,
				};
				//Create Order
				createOrder(user._id, authToken, orderData);

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
				token={processPayment}
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
			<h5>
				Total Amount:{" "}
				<span className="badge badge-info text-white">{getFinalAmount()}</span>
			</h5>
			<br />
			<h5>Stripe Checkout</h5>
			{showStripeButton()}
		</div>
	);
};

export default StripeCheckout;
