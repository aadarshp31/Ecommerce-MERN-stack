import { API } from "../../backend";

//--------------CATEGORY CALLS----------------//

//Create a Category
export const createCategory = (userId, token, category) => {
	return fetch(`${API}/category/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(category),
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};

//Get a Category
export const getCategory = (categoryId) => {
	return fetch(`${API}/category/${categoryId}`, {
		method: "GET",
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};

//Get all the Categories
export const getAllCategories = () => {
	return fetch(`${API}/categories`, {
		method: "GET",
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};

//Update a Category
export const updateCategory = (userId, categoryId, token, categoryUpdate) => {
	return fetch(`${API}/category/${categoryId}/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(categoryUpdate),
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};

//Delete a Category
export const deleteCategory = (userId, categoryId, token) => {
	return fetch(`${API}/category/${categoryId}/${userId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};

//--------------PRODUCT CALLS----------------//

//Create a Product
export const createProduct = (userId, token, product) => {
	return fetch(`${API}/product/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: product,
	})
		.then((res) => res.json())
		.catch((err) => console.log(err));
};

//Get all the products
export const getAllProducts = (query) => {
	return fetch(`${API}/products${query ? '?' + query : ''}`, {
		method: "GET",
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};

//Get a Product
export const getProduct = (productId) => {
	return fetch(`${API}/product/${productId}`, {
		method: "GET",
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};

//Update a Product
export const updateProduct = (userId, productId, token, productUpdate) => {
	return fetch(`${API}/product/${productId}/${userId}`, {
		method: "PUT",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: productUpdate,
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};

//Delete a Product
export const deleteProduct = (userId, productId, token) => {
	return fetch(`${API}/product/${productId}/${userId}`, {
		method: "DELETE",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
		.then((response) => response.json())
		.catch((err) => console.log(err));
};
