import queryString from "query-string";
import { API } from "../../backend";

export const getProducts = (query) => {
	return fetch(`${API}/products${query ? "?" + query : ""}`, { method: "GET" })
		.then((response) => response.json())
		.catch((err) => console.log(err));
};


export async function searchProducts(query){
	return fetch(`${process.env.REACT_APP_BACKEND}/products/search${query ? "?" + query : ""}`).then(res => res.json()).then((results) => {
		return results.products;
	})
}