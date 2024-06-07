import React from "react";
import Menu from "./Menu";

const Base = ({
	title = "My Title",
	description = "My Description",
	className = "bg-light text-dark text-center p-4",
	children,
}) => {
	return (
		<div>
			<Menu />
			<div className="gradient" style={{ marginTop: "50px" }}>
				<div className="jumbotron bg-light text-light text-center gradient">
					<h4>{title}</h4>
					<p className="lead">{description}</p>
				</div>
				<div className={className}>{children}</div>
			</div>
			<footer className="footer mt-auto py-3 gradient text-white">
				<div className="container text-center">
						<p>
							Made with
							<span class="heart" style={{ color: "red", fontSize: "1.2rem" }}>&hearts;</span>
							by {" "}
							<span><a href="https://www.linkedin.com/in/aadarshp31" target="_blank" className=" font-weight-bold text-light">Adarsh Pandey</a></span>
						</p>
						
						<p className="text-light font-weight-light">
							Updated on June 8th, 2024
						</p>
				</div>
			</footer>
		</div>
	);
};

export default Base;
