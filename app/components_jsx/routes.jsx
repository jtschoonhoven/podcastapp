import React from "react";
import {Router, Route} from "react-router";
import Shows from "./shows";
import Episodes from "./episodes";

export default (history) => {
    return (
        <Router history={history || undefined}>
            <Route path="/" component={Shows} />
            <Route path="/shows" component={Shows} />
            <Route path="/shows/:showId/episodes" component={Episodes} />
        </Router>
    );
};
