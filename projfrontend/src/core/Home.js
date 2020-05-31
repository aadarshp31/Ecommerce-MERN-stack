import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "../core/Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls"

const Home = () => {
	const [products, setProducts] = useState([]);
	const [error, setError] = useState(false);
	
	const loadAllProducts = () => {
		return getProducts()
		.then(data => {
			if(data.error){
				setError(data.error);
			} else {
				setProducts(data);
			}
		})
		.catch(err => console.log(err));
	}

	useEffect(() => {
		loadAllProducts();
	}, [])


	return (
		<Base title="Home Page" description="Welcome to the Tshirt Store">
                <h1 className="text-white mx-auto mb-5">All T-Shirts</h1>
				<div className="row">
					{products.map((product, index) => {
						return(
							<div key={index} className="col-4 mb-4">
								<Card removeFromCart="true" />
							</div>
						);
					})}
				</div>
		</Base>
	);
};

export default Home;
