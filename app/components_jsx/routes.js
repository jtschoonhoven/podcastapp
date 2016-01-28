import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from './app';
import Features from './features';
import Show from './show';


export default function(history) {
    return (
        <Router history={history || undefined}>
            <Route path="/" component={App}>
                <IndexRoute components={Features} />
                <Route path="shows" component={Features} />
                <Route path="shows/:id(/:showName)" component={Show} />
            </Route>
        </Router>
    );
}
