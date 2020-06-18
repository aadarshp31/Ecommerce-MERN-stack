import React from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const ManageUserInfo = () => {
	return (
		<Base
			title="Manage User Details Page"
			description="Welcome to User Details Page"
			className="container bg-white p-4 rounded"
		>
            {<Link className="btn btn-info rounded" to={`/user/dashboard`}>
				<span>User Dashboard</span>
			</Link>}
        </Base>
	);
};

export default ManageUserInfo;