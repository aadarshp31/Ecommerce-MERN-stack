import React from "react";

const ImageHelper = ({ product }) => {
	const discountPercentage = product ? product.discountPercentage : null;
	const imageurl = product.thumbnail
		? product.thumbnail
		: `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

	return (
		<>
			<div>
				<img src={imageurl} className="card-img-top" alt="Course alt text" style={{ mixBlendMode: "multiply" }} />
			</div>
		</>
	);
};

export default ImageHelper;
