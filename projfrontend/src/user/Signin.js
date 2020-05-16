import React, { useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";

const signInForm = () => {
	return (
		<div className="row">
			<div className="col-md-6 offset-sm-3 text-left">
				<form>
					<div className="form-group">
						<label className="text-light">Email</label>
						<input type="email" className="form-control" />
					</div>
					<div className="form-group">
						<label className="text-light">Password</label>
						<input type="password" className="form-control" />
					</div>
					<button className="btn btn-success btn-block">Sign in</button>
				</form>
			</div>
		</div>
	);
};

const Signin = () => {
	return (
		<div>
			<Base title="Signin Page" description="A page for the user to Sign in!">
				{signInForm()}
			</Base>
		</div>
	);
};

export default Signin;
