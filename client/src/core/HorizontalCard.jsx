import React from 'react'
import ImageHelper from './helper/ImageHelper';

const HorizontalCard = ({ product }) => {

  const cardTitle = product ? product.title : "A Photo from Pexels";
  const cardDescription = product ? product.description : "Product Description";
  const cardPrice = product.price;
  const cardRating = product ? product.rating.toFixed(1) : null;
  const discountPercentage = product ? product.discountPercentage : null;


  return (
    <div className="card mb-3 w-100 shadow-sm postion-relative" style={{ cursor: "pointer" }}>
			{discountPercentage && discountPercentage > 5 && (<p className='badge-primary font-weight-bold position-absolute' style={{ left: 0, top: 0, width: "6em", opacity: "100%", zIndex: 3}}>{discountPercentage}% off</p>)}
      <div className="row no-gutters align-items-center">
        <div className="col-md-4" style={{ maxWidth: "18rem" }}>
          <ImageHelper product={product} />
        </div>
        <div className="col-md-8">
          <div className="card-body text-left">
            <h2 className="card-title">{cardTitle}</h2>
            <p className="card-text">{cardDescription}</p>
            <span className='text-muted'>{product.shippingInformation}</span>
            <p className='text-muted'>{product.returnPolicy}</p>
            <p className="badge badge-success px-3 py-2">
              {cardRating} {renderRatings(cardRating)}
            </p>
            <p className="card-text" style={{ fontSize: "2.5rem" }}><sup style={{ fontSize: "1.4rem" }}>₹</sup>{cardPrice}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function renderRatings(rating) {
  // return rating ? ("<span className=\"fa fa-star\"></span>".repeat(parseInt(rating))) : "--";
  if (!rating) return "--";
  const result = [];
  for (let i = 0; i < parseInt(rating); i++) {
    result.push(<span className="fa fa-star" key={i}></span>);
  }

  return result;
}

export default HorizontalCard;