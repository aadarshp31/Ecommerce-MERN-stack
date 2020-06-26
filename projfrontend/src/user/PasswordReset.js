import React, {useState} from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const PasswordReset = () => {
    //React Hooks
    const [ passwordObject, setPasswordObject] = useState({
        newPass1: "",
        newPass2: "",
        oldPass: ""
    })
    const [ status, setStatus ] = useState({
        loading: false,
        error: "",
        disableControls: false
    })

    //Destructuring
    const { newPass1, newPass2, oldPass } = passwordObject;
    const { loading, error } = status;

    const handleChange = (name) => (event) => {
        setPasswordObject({...passwordObject , [name]: event.target.value});
    }

    const validation = () => {
        if ((newPass1 === newPass2) && newPass1.length >= 6) {
            return true;
        } else {
            return false;
        }
    }
    

    const resetPasswordForm = () => {
        return(
            <form>
            <h6 className={validation() ? "text-success" : "text-warning"}>Password must be atlease 6 digits in length</h6>
            <h6 className={validation() ? "text-success" : "text-warning"}>New Password fields should match</h6>
            <div className="input-group mb-3">
				<div className="input-group-prepend">
					<label className="input-group-text">New Password</label>
				</div>
				<input
					type="password"
					className={`form-control ${validation() ? `border-success` : `border-warning`}`}
					placeholder="New Password"
					value={newPass1}
					onChange={handleChange("newPass1")}
				/>
			</div>
            <div className="input-group mb-3">
				<div className="input-group-prepend">
					<label className="input-group-text">Retype New Password</label>
				</div>
				<input
					type="password"
					className={`form-control ${validation() ? `border-success` : `border-warning`}`}
					placeholder="Retype New Password"
					value={newPass2}
					onChange={handleChange("newPass2")}
				/>
			</div>
            <h6 className="text-info">Enter your current password to authorize this update</h6>
			<div className="input-group mb-3">
				<div className="input-group-prepend">
					<label className="input-group-text">Password</label>
				</div>
				<input
					type="password"
					className="form-control"
					placeholder="Password"
					value={oldPass}
					onChange={handleChange("oldPass")}
					disabled={(newPass1 !== newPass2) || !newPass1 || !newPass2}
				/>
			</div>
			<button
				className="btn btn-info rounded"
				disabled={(newPass1 !== newPass2) || !newPass1 || !newPass2 || !oldPass}
			>
				Update Info
			</button>
		</form>
        );
    }

	return (
		<Base
			title="Password Reset Page"
			description="Manage your password here"
            className="container bg-white p-4 rounded"
		>
            <Link className="btn btn-info rounded mb-4" to="/user/dashboard">
                User Dashboard
            </Link>
            {resetPasswordForm()}
        </Base>
	);
};

export default PasswordReset;
