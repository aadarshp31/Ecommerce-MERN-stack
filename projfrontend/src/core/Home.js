import React from "react";
import {API} from "../backend";


console.log("Environment Variable:", API);

const Home = () => {
    return(
        <div>
            <h1>This is Home Component</h1>
        </div>
    );
}

export default Home;