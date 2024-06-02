import React from "react";
import Menu from "./Menu";

const Base = ({
	title = "My Title",
	description = "My Description",
	className = "bg-dark text-white text-center p-4",
	children,
}) => {
	return (
		<div>
			<Menu />
			<div style={{marginTop: "50px"}}>
				<div className="jumbotron bg-dark text-white text-center gradient">
					<h4>{title}</h4>
					<p className="lead">{description}</p>
				</div>
				<div className={className}>{children}</div>
			</div>
			<footer className="footer bg-dark mt-auto py-3">
				<div className="container-fluid text-center text-white py-3 gradient">
					<h6>If you've got any questions, feel free to reach out!</h6>
					<button className="btn btn-danger btn-sm rounded">Contact Us</button>
				</div>
				<div className="container">
					<span className="text-muted">
						An Ecommerce website based on <span className="text-white">MERN</span> Stack
					</span>
				</div>
			</footer>
		</div>
	);
};

export default Base;
