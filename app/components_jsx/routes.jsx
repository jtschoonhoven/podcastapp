import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import Container from "./container";
import Shows from "./shows";
import Show from "./show";

export default (history) => {
    return (
        <Router history={history || undefined}>
            <Route path="/" component={Container}>
                <IndexRoute components={Shows} />
                <Route path="shows" component={Shows} />
                <Route path="shows/:id(/:showName)" component={Show} />
            </Route>
        </Router>
    );
};
