import React, { useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { signup } from "../auth/helper/index";

const Signup = () => {
	//Initial States for the Signup component
	const initialValues = {
		name: "",
		lastname: "",
		email: "",
		password: "",
		confirmPassword: "",
		error: "",
		success: false,
	};

	//States for Signup component
	const [values, setValues] = useState(initialValues);

	//Destructuring the states of the Signup component
	const { name, lastname, email, password, confirmPassword, error, success } = values;

	//Sets data in the states according to the input fields
	const handleChange = (inputValue) => (event) => {
		setValues({
			...values,
			error: false,
			success: false,
			[inputValue]: event.target.value,
		});
	};

	//Submits the signup form and gets the response data from the backend
	const formSubmit = (event) => {
		event.preventDefault();
	
		if(name.length < 1){
			setValues({...values, error: "Name must me atleast 2 characters in length"});
			document.getElementById("name").focus()

		} else if(email.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g) === null){
			setValues({...values, error: "Invalid Email id"});
			document.getElementById("email").focus()

		} else if(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/g) === null){
			setValues({...values, error: "Password must be 6 characters long, contain atleast one uppercase, one lowercase letter and a number"});
			document.getElementById("password").focus()

		} else if(password !== confirmPassword){
			setValues({...values, error: "Passwords should match"});
			document.getElementById("confirmPassword").focus()

		} else {
		setValues({ ...values, error: false });
		signup({ name, lastname, email, password })
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error, success: false });
				} else {
					setValues({ ...initialValues, success: true });
				}
			})
			.catch((err) =>
				console.log("Error: Signup request to the server failed!\n", err)
			);
		//This catch runs whenever there is an error at the backend which is not handle
		}
	};

	//Signup success message popup
	const successMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-center">
					<div
						className="alert alert-success"
						style={{ display: success ? "" : "none" }}
					>
						New account was created successfully. Please{" "}
						<Link to="/signin">Login here</Link>
					</div>
				</div>
			</div>
		);
	};

	//Signup error message popup
	const errorMessage = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-center">
					<div
						className="alert alert-danger"
						style={{ display: error ? "" : "none" }}
					>
						{error}
					</div>
				</div>
			</div>
		);
	};

	//Signup form component
	const signUpForm = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<form>
						<div className="form-group">
							<label className="text-light">First Name</label>
							<input
								id="name"
								type="text"
								className="form-control"
								onChange={handleChange("name")}
								value={name.trim()}
							/>
						</div>
						<div className="form-group">
							<label className="text-light">Last Name</label>
							<input
								type="text"
								className="form-control"
								onChange={handleChange("lastname")}
								value={lastname.trim()}
							/>
						</div>
						<div className="form-group">
							<label className="text-light">Email</label>
							<input
								id="email"
								type="email"
								className="form-control"
								onChange={handleChange("email")}
								value={email.toLowerCase().trim()}
							/>
						</div>
						<div className="form-group">
							<label className="text-light">Password</label>
							<input
								id="password"
								type="password"
								className="form-control"
								onChange={handleChange("password")}
								value={password.trim()}
							/>
							<small id="passwordHelpBlock" className="form-text text-light">
								Password must be 6 characters long, contain atleast one uppercase, one lowercase letter and a number
							</small>
						</div>
						<div className="form-group">
							<label className="text-light">Confirm Password</label>
							<input
								id="confirmPassword"
								type="password"
								className="form-control"
								onChange={handleChange("confirmPassword")}
								value={confirmPassword.trim()}
							/>
							<small id="passwordHelpBlock" className="form-text text-light">
								Must match the password
							</small>
						</div>
						<button className="btn btn-info btn-block" onClick={formSubmit}
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	};

	return (
		<div>
			<Base title="Signup Page" description="Create your ecommerce account">
				{successMessage()}
				{errorMessage()}
				{signUpForm()}
			</Base>
		</div>
	);
};

export default Signup;
