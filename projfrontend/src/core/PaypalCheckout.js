import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import { loadCart, clearCart } from "./helper/cartHelper";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { getToken, processPayment } from "./helper/paypalPaymentHelper";

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

	//Getting clientToken from the backend
	const getClientToken = (userId, token) => {
		getToken(userId, token)
			.then((data) => {
				if (data.error) {
					setInfo({ error: data.error });
				} else {
					const clientToken = data.clientToken;
					setInfo({clientToken });
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
		return info.clientToken !== null && isAuthenticated() && products.length > 0 ? (
			<div>
				<DropIn
					options={{ authorization: info.clientToken }}
					onInstance={instance => (info.instance = instance)}
				/>
				<button onClick={() => {}} className="btn btn-info rounded">Pay with Paypal</button>
			</div>
		) : (
			<div>
				{!isAuthenticated() ? (
				<Link to="/signin">
					<button className="btn btn-warning rounded">Signin</button>
				</Link>
				) : (
                    <h5>The cart is empty...</h5>
                )}
			</div>
		);
	};

	return (
		<div>
			<h4>Paypal Checkout</h4>
            {showPaypalCheckout()}
		</div>
	);
};

export default PaypalCheckout;
