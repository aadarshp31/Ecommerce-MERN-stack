import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";

const StripeCheckout = ({ products, setReload = (f) => f, reload=undefined }) => {
    const initialValues = {
        loading: false,
        success: false,
        error: "",
        address: ""
    }
    const [data, setData] = useState(initialValues);
    const { user, token } = isAuthenticated();


    return(
        <div>
            <h2 className="text-white">Stripe Checkout Loaded!</h2>

        </div>
    );
}

export default StripeCheckout;