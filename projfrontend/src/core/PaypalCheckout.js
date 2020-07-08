import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import { loadCart, clearCart } from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { getToken, processPayment } from "./helper/paypalPaymentHelper";
import { createOrder } from "./helper/orderHelper";

const PaypalCheckout = ({
	products,
	setReload = (f) => f,
	reload = undefined,
}) => {
	const initialValues = {
		loading: false,
		success: false,
		clientToken: null,
		instance: {},
		error: "",
	};
	//States
	const [info, setInfo] = useState(initialValues);

	//User data
	const { user, token } = isAuthenticated();

	//Total Amount
	const getFinalAmount = () => {
		let amount = 0;
		products.map((p) => {
			amount += p.price * p.quantity;
		});
		return amount;
	};

	//Getting clientToken from the backend
	const getClientToken = (userId, token) => {
		getToken(userId, token)
			.then((data) => {
				if (data.error) {
					setInfo({ error: data.error });
				} else {
					const clientToken = data.clientToken;
					setInfo({ clientToken });
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		if (isAuthenticated()) {
			getClientToken(user._id, token);
		}
	}, []);

	//Conditional loading of Paypal Checkout
	const showPaypalCheckout = () => {
		return info.clientToken !== null &&
			isAuthenticated() &&
			products.length > 0 ? (
			<div>
				<DropIn
					options={{ authorization: info.clientToken }}
					onInstance={(instance) => (info.instance = instance)}
				/>
				<button onClick={onPurchase} className="btn btn-info rounded">
					Pay with Paypal
				</button>
			</div>
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

	const onPurchase = () => {
		setInfo({ loading: true });
		let nonce;
		//Getting Nonce from the Braintree servers
		let getNonce = info.instance.requestPaymentMethod().then((data) => {
			nonce = data.nonce;
			const paymentData = {
				paymentMethodNonce: nonce,
				amount: getFinalAmount(),
			};
			//Calling our backend method
			processPayment(user._id, token, paymentData)
				.then((response) => {
					setInfo({ ...info, loading: false, success: response.success });
					console.log("payment success");

					//Order Data for creating order
					const orderData = {
						products: products,
						transaction_id: response.transaction.id,
						amount: response.transaction.amount,
					};

					//Create order for the user
					createOrder(user._id, token, orderData);

					//Clear cart and force reload
					clearCart(() => {
						setReload(!reload);
					});
				})
				.catch((err) => {
					setInfo({ error: err, loading: false, success: false });
					console.log("payment failed");
				});
		});
	};

	return (
		<div>
			<h4>Paypal Checkout</h4>
			{showPaypalCheckout()}
		</div>
	);
};

export default PaypalCheckout;
