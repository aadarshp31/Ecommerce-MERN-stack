import React from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ErrorToast = ({ error = false }) => {
    if (error) {
        toast.error(`Error: ${error}`, {
            position: "top-right",
            autoClose: 9000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        })
    }
    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={9000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
            />

        </div>
    );
}

export default ErrorToast;