import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from "react-stripe-checkout";
import { API } from "../backend";

const StripeCheckout = ({ products, setReload = (f) => f, reload=undefined }) => {
    const initialValues = {
        loading: false,
        success: false,
        error: "",
        address: ""
    }
    const [data, setData] = useState(initialValues);
    const { user, token } = isAuthenticated();
    
    const getFinalAmount = () => {
        let amount = 0;
        products.map(p => {
            amount += p.price
        });
        return amount;
    }

    const makePayment = (token) => {
        const headers = {
            "Content-Type": "application/json"
        }
        const body = {
            token,
            products
        }

        return fetch(`${API}/payment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        })
        .then(response => {
            console.log(response)
            //Call further methods like Create Order and clear cart etc.
        })
        .catch(err => console.log(err));
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton 
                stripeKey={process.env.REACT_APP_STRIPE_PK}
                token={makePayment}
                amount={getFinalAmount() * 100}
                name="Buy T-Shirt"
            >
                <button className="btn btn-info rounded">Pay with Stripe</button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning rounded">Signin</button>
            </Link>
        );
    }

    return(
        <div>
            <h2 className="text-white">Stripe Checkout Loaded! Amount: {getFinalAmount()}</h2>
            {showStripeButton()}
        </div>
    );
}

export default StripeCheckout;