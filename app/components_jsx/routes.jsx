import React from "react";
import {Router, Route, IndexRoute} from "react-router";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../reducers';
import Container from "./container";
import Shows from "./shows";
import Show from "./show";

const store = createStore(reducers);

export default history => {
    return (
        <Provider store={store}>
            <Router history={history || undefined}>
                <Route path="/" component={Container}>
                    <IndexRoute components={Shows} />
                    <Route path="shows" component={Shows} />
                    <Route path="shows/:id(/:showName)" component={Show} />
                </Route>
            </Router>
        </Provider>
    );
};
