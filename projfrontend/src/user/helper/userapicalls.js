import { API } from "../../backend"

//Get User Profile
export const getUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "applicaion/json",
            "Content-Type": "applicaion/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .catch(err => console.log(err));
}