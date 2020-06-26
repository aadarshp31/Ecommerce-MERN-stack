import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const PasswordReset = () => {


	return (
		<Base
			title="Password Reset Page"
			description="Manage your password here"
            className="container bg-white p-4 rounded"
		>
            <Link className="btn btn-info rounded mb-4" to="/user/dashboard">
                User Dashboard
            </Link>
        </Base>
	);
};

export default PasswordReset;
