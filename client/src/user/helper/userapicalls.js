import { API } from "../../backend";

//Get User Profile
export const getUser = (userId, token) => {
	return fetch(`${API}/user/${userId}`, {
		method: "GET",
		headers: {
			Accept: "applicaion/json",
			"Content-Type": "applicaion/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};

export const updateUser = (userId, token, userInfo) => {
	return fetch(`${API}/user/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(userInfo),
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};

export const updatePassword = (userId, token, data) => {
	return fetch(`${API}/user/password-reset/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	})
		.then((response) => response.json())
		.catch((err) => err.json());
};
