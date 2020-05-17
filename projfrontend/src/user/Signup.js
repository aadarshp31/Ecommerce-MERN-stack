import React, { useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { signup } from "../auth/helper/index"

const Signup = () => {

	const initialValues = {
		name: "",
		email: "",
		password: "",
		error: "",
		success: false
	}

	const [values, setValues] = useState(initialValues)

	const { name, email, password, error, success } = values;

	const handleChange = inputValue => event => {
		event.preventDefault();
		setValues({...values, error: false, [inputValue]: event.target.value});
	}

	const formSubmit = event => {
		setValues({...values, error: false });
		signup({ name, email, password })
		.then(data => {
			if(data.error){
				setValues({ ...values, error: data.error, success: false })
			} else {
				setValues(initialValues);
			}
		})
		.catch(console.log("Error in signup"));
	}

	const signUpForm = () => {
		return (
			<div className="row">
				<div className="col-md-6 offset-sm-3 text-left">
					<form>
						<div className="form-group">
							<label className="text-light">Name</label>
							<input type="text" className="form-control" onChange={handleChange("name")} />
						</div>
						<div className="form-group">
							<label className="text-light">Email</label>
							<input type="email" className="form-control" onChange={handleChange("email")} />
						</div>
						<div className="form-group">
							<label className="text-light">Password</label>
							<input type="password" className="form-control" onChange={handleChange("password")} />
						</div>
						<button className="btn btn-success btn-block">Submit</button>
					</form>
				</div>
			</div>
		);
	};

	return (
		<div>
			<Base title="Signup Page" description="A page for the user to Sign up!">
				{signUpForm()}
			</Base>
		</div>
	);
};

export default Signup;
