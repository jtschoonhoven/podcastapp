import React from "react";
import {Router, Route} from "react-router";
import Shows from "./shows";

export default history => {
    return (
        <Router history={history || undefined}>
            <Route path="*" component={Shows} />
        </Router>
    );
};
