//Create and save cart array in the localStorage of the browser if not present already.
export const createCart = () => {
	if (typeof window !== undefined) {
		if (!localStorage.getItem("cart")) {
			let cart = [];
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	}
};

//Create
export const addItemToCart = (item, next) => {
	let cart = [];
	if (typeof window !== undefined) {
		if (localStorage.getItem("cart")) {
			cart = JSON.parse(localStorage.getItem("cart"));
		}
		cart.push({
			...item,
		});
		localStorage.setItem("cart", JSON.stringify(cart));
		next();
	}
};

//Read
export const loadCart = () => {
	if (typeof window !== undefined) {
		if (localStorage.getItem("cart")) {
			return JSON.parse(localStorage.getItem("cart"));
		}
	}
};

export const getQuantityFromCart = (products) => {
	let cart = loadCart();
	cart.map((item) => {
		products.map((product) => {
			if (item._id === product._id) {
				product.quantity = item.quantity;
			}
		});
	});
};

//Update
export const updateCart = (updatedCart) => {
	if (typeof window !== undefined) {
		if (localStorage.getItem("cart")) {
			localStorage.setItem("cart", JSON.stringify(updatedCart));
		}
	}
};

//Delete
export const removeItemFromCart = (productId) => {
	let cart = [];
	if (typeof window !== undefined) {
		if (localStorage.getItem("cart")) {
			cart = JSON.parse(localStorage.getItem("cart"));
			cart = cart.filter((product) => product._id !== productId);
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	}
};

//Empty Cart
export const clearCart = (next) => {
	if (typeof window !== undefined) {
		if (localStorage.getItem("cart")) {
			localStorage.removeItem("cart");
			//Add an empty cart array to avoid any error
			let cart = [];
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	}
	next();
};
