import React from "react";
import {Router, Route} from "react-router";
import Shows from "./shows";
import Show from "./show";

export default (history) => {
    return (
        <Router history={history || undefined}>
            <Route path="/" component={Shows} />
            <Route path="/shows/:id" component={Show} />
        </Router>
    );
};
