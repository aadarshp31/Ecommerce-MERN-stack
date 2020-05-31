import React from "react";
import ImageHelper from "./helper/ImageHelper";

const Card = ({product, addToCart=true, removeFromCart=false}) => {
    const cardTitle = product ? product.name : "A Photo from Pexels";
    const cardDescription = product ? product.description : "Product Description";
    const cardPrice = product ? product.price : "DEFAULT";


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
                <h5 className="card-title">{cardTitle}</h5>
                <p className="badge badge-secondary px-3 py-2">₹ {cardPrice}</p>                
                <p className="card-text">{cardDescription}</p>
                {showAddToCart(addToCart)}
                {showRemoveFromCart(removeFromCart)}
            </div>
        </div>
    );
}

export default Card;