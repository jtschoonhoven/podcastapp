import React from "react";
import {Router, Route} from "react-router";
import ListItem from "./listing/list_item";
import Listing from "./listing";

export default history => {
    return (
        <Router history={history || undefined}>
            <Route path="/" component={Listing} />
            <Route path="/a" component={ListItem} />
            <Route path="*" component={ListItem} />
        </Router>
    );
};
