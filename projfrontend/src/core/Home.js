import React from "react";
import "../styles.css";
import Base from "../core/Base";
import Card from "./Card";


const Home = () => {
	return (
		<Base title="Home Page" description="Welcome to the Tshirt Store">
			<div className="row">
                <div className="col-4">
                    <Card />
                </div>
				<div className="col-4">
                    <Card />
				</div>
				<div className="col-4">
                    <Card />
				</div>
			</div>
		</Base>
	);
};

export default Home;
