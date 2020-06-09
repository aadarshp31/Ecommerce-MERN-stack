import { API } from "../../backend";

export const getToken = (userId, token) => {
	return fetch(`${API}/payment/gettoken/${userId}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};

export const processPayment = (userId, token, paymentInfo) => {
	return fetch(`${API}/payment/paypal/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(paymentInfo),
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};
