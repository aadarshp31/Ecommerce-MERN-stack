import { API } from "../../backend";

export const getProducts = (query) => {
    return fetch(`${API}/products${query ? "?" + query : ""}`,{method: "GET"})
    .then(response => response.json())
    .catch(err => console.log(err));
}