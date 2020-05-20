import React from "react";
import "../styles.css"
import Base from "../core/Base"

const Home = () => {
    return(
        <Base title="Home Page" description="Welcome to the Tshirt Store" >
            <div className="row">
                <div className="col-4">
                    <button className="btn btn-success">Test Button</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">Test Button</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">Test Button</button>
                </div>
            </div>
        </Base>
    );
}

export default Home;