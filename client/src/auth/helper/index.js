import { API } from "../../backend";

//Send user signup data to the backend
export const signup = (user) => {
	return fetch(`${API}/signup`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

//Send user user: {email, password} data to the backend and creates "JWT token" and sets Cookie
//Then if signin is successful returns "JWT token" and "user data" which will be set to localStorage at the frontend
export const signin = (user) => {
	return fetch(`${API}/signin`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(user),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};

//Called after signin succeeds to save the response "JWT token" & "user data" to the localStorage of client's browser
export const authenticate = (data, next) => {
	if (typeof Window !== "undefined") {
		localStorage.setItem("jwt", JSON.stringify(data));
		next();
	}
};

//First : It removes jwt token set in the localStorage of browser
//Second : "next()" is used to fire a callback which will be used in frontend to redirect
//Third : fetch sends a "GET" req to the backend which clears the "Cookie" at backend thereby signout the user from tha backend
export const signout = (next) => {
	if (typeof Window !== "undefined") {
		localStorage.removeItem("jwt");
		next();

		return fetch(`${API}/signout`, {
			method: "GET",
		})
			.then((response) => console.log("Signout successful!"))
			.catch((err) => console.log(err));
	}
};

//It check wheather the client's browser localStorage contains JWT token and user data as a key "jwt"
export const isAuthenticated = () => {
	if (typeof Window == "undefined") {
		return false;
	}
	if (localStorage.getItem("jwt")) {
		return JSON.parse(localStorage.getItem("jwt"));
	} else {
		return false;
	}
};
