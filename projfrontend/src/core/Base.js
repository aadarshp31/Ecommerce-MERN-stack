import React from "react";
import Menu from "./Menu"

const Base = ({
	title = "My Title",
	description = "My Description",
	className = "bg-dark text-white text-center p-4",
	children,
}) => {
	return (
		<div>
        <Menu />
			<div className="container-fluid">
				<div className="jumbotron bg-dark text-white text-center">
					<h2 className="display-4">{title}</h2>
					<p className="lead">{description}</p>
				</div>
				<div className={className}>{children}</div>
			</div>
			<footer className="footer bg-dark mt-auto py-3">
				<div className="container-fluid bg-success text-center text-white py-3">
					<h4>If you've got any questions, feel free to reach out!</h4>
					<button className="btn btn-warning btn-lg">Contact Us</button>
				</div>
				<div className="container">
					<span className="text-muted">
						An amazing <span className="text-white">MERN</span> Stack Project
					</span>
				</div>
			</footer>
		</div>
	);
};

export default Base;
