import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom"
import { isAuthenticated } from "../auth/helper";
import { getAllProducts, deleteProduct } from "./helper/adminapicall"

const ManageProduct = () => {
    const [ products, setProducts] = useState([])
    const [ loading, setLoading] = useState(false)
    const { user, token } = isAuthenticated();

    const preload = () => {
        setLoading(true);
        getAllProducts().then(data => {
            if(data.error){
                console.log(data.error);
            } else {
                setProducts(data);
                setLoading(false);
            }
        })
    }

    useEffect(()=> {
        preload();
    }, [])

    const deleteThisProduct = (productId) => {
        setLoading(true);
        deleteProduct(user._id, productId, token).then(data => {
            if(data.error){
                console.log(data.error)
            } else {
                preload();
                setLoading(false);
            }
        }).catch(err => console.log(err));
    }

	//Loading Message
	const loadingMessage = () => {
		if (loading) {
			return (
				<div className="m-2 text-info">
					<h4 className="text-info">Loading...</h4>
				</div>
			);
		}
	};
    
	return (
		<Base title="Manage Product Page" description="Manage products here" className="container bg-white rounded p-4">
			<Link className="btn btn-info rounded" to={`/admin/dashboard`}>
				<span className="">Admin Home</span>
			</Link>
			<h2 className="mb-4 text-center">All Products</h2>
			<div className="row">
				<div className="col-12">
					<h4 className="text-left text-warning my-3">Total products: {products.length}</h4>
                    {products.map((product, index) => {
                        return(  
                            <div key={index}>                 
                                <div className="row text-center text-muted">
                                    <div className="col-8 pl-5">
                                        <h3 className="text-left" style={{textTransform: "capitalize"}}>{product.name}</h3>
                                    </div>
                                    <div className="col-2">
                                        <Link
                                            className="btn btn-success"
                                            to={`/admin/product/update/${product._id}`}
                                        >
                                            <span className="">Update</span>
                                        </Link>
                                    </div>
                                    <div className="col-2">
                                        <button onClick={() => {deleteThisProduct(product._id)}} className="btn btn-danger">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <hr />
                            </div>);
                    })}
                    {loadingMessage()}
				</div>
			</div>
		</Base>
	);
};

export default ManageProduct;
