import React from "react";
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import Home from "./core/Home"
import App from "./App"

const Routes = () => {
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/hi" component={App} />
            </Switch>
        </Router>
    );
}

export default Routes;