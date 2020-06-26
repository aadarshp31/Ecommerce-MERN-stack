import React, {useState} from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { updatePassword } from "./helper/userapicalls";

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
		success: false
    })

	//Destructuring
	const { user, token } = isAuthenticated();
    const { newPass1, newPass2, oldPass } = passwordObject;
	const { loading, error, success } = status;
	
	
	//Loading Message
	const loadingMessage = () => {
		if (loading) {
			return (
				<div className="alert alert-info m-2 text-info">
					<h4 className="text-info">Loading...</h4>
				</div>
			);
		}
	};

	//Success Message
	const successMessage = () => {
		return (
			<div
				className="alert alert-success m-2 text-success"
				style={{ display: success ? "" : "none" }}
			>
				<h4>{`${success}`}</h4>
			</div>
		);
	};

	//Signup error message popup
	const errorMessage = () => {
		if (error) {
			return (
				<div className="alert alert-danger m-2 text-danger">
					<h4>Password Updation Failed!</h4>
					<p>{JSON.stringify(error)}</p>
				</div>
			);
		}
	};

    const handleChange = (name) => (event) => {
		//Resetting errors
		setStatus({ ...status, error: "" })
        setPasswordObject({...passwordObject , [name]: event.target.value});
    }

    const validation = () => {
        if ((newPass1 === newPass2) && newPass1.length >= 6) {
            return true;
        } else {
            return false;
        }
    }
	
	const formSubmit = (event) => {
		event.preventDefault();

		setStatus({ ...status, loading: true })

		//Setting up data for the backendc
		let newPassword = newPass1,
		password = oldPass;
		
		let formdata = {
			newPassword,
			password
		}

		updatePassword( user._id, token, formdata )
			.then(data => {
				if (data.error) {
					setStatus({ ...status, loading: false, error: data.error });
				} else {
					setStatus({ ...status, loading: false, success: "Password for user " + data.name + " has been updated successfully" })
				}
			})
			.catch(err => {
				setStatus({ ...status, loading: false, error: `Error communicationg with the backend, ${err}` })
				//Reset States
				setPasswordObject({
					newPass1: "",
					newPass2: "",
					oldPass: ""
				})
			})
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
				onClick={formSubmit}
			>
				Update Password
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
			{loadingMessage()}
			{errorMessage()}
			{successMessage()}
        </Base>
	);
};

export default PasswordReset;
