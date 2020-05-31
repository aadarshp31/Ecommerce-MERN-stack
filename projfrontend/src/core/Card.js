import React from "react";
import ImageHelper from "./helper/ImageHelper";

const Card = ({product, addToCart=true, removeFromCart=false}) => {
    const showAddToCart = (addToCart) => {
        return(
            addToCart && (
                <a href="#" className="btn btn-info btn-block rounded">Add to Cart</a>
            )
        );
    }

    const showRemoveFromCart = (removeFromCart) => {
        return(
            removeFromCart && (
                <a href="#" className="btn btn-danger btn-block rounded">Remove from Cart</a>
            )
        );
    }


    return(
        <div className="card text-secondary mx-auto" style={{"width": "18rem"}}>
            <ImageHelper product={product} />
            <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="badge badge-secondary px-3 py-2">₹ 999</p>                
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                {showAddToCart(addToCart)}
                {showRemoveFromCart(removeFromCart)}
            </div>
        </div>
    );
}

export default Card;