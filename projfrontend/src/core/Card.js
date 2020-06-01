import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { addItemToCart } from "./helper/cartHelper"
import { Redirect } from "react-router-dom";

const Card = ({product, addToCartButton=true, removeFromCartButton=false, history}) => {
    const cardTitle = product ? product.name : "A Photo from Pexels";
    const cardDescription = product ? product.description : "Product Description";
    const cardPrice = product ? product.price : "DEFAULT";

    const [redirect, setRedirect] = useState(false)

    const addToCart = () => { 
        addItemToCart(product, () => setRedirect(true));
    }

    const performRedirect = (redirect) => {
        if(redirect) {
            return <Redirect to="/cart" />;
        }
    }

    const showaddToCartButton = (addToCartButton) => {
        return(
            addToCartButton && (
                <button className="btn btn-info btn-block rounded" onClick={addToCart}>Add to Cart</button>
            )
        );
    }

    const showremoveFromCartButton = (removeFromCartButton) => {
        return(
            removeFromCartButton && (
                <button className="btn btn-danger btn-block rounded">Remove from Cart</button>
            )
        );
    }


    return(
        <div className="card text-secondary mx-auto" style={{"width": "18rem"}}>
            <ImageHelper product={product} />
            <div className="card-body">
                <h5 className="card-title">{cardTitle}</h5>
                <p className="badge badge-secondary px-3 py-2">₹ {cardPrice}</p>                
                <p className="card-text">{cardDescription}</p>
                {showaddToCartButton(true)}
                {showremoveFromCartButton(true)}
                {performRedirect(redirect)}
            </div>
        </div>
    );
}

export default Card;