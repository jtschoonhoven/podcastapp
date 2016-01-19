"use strict";
const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const match = require('react-router').match;
const RoutingContext = require('react-router').RoutingContext;
const Provider = require('react-redux').Provider;
const createStore = require('redux').createStore;
const combineReducers = require('redux').combineReducers;
const routes = require('../app/components/routes').default;
const reducers = require('../app/reducers').reducers;


module.exports = (req, res, next) => {
    match({ routes: routes(), location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            const app = renderApp(renderProps);
            res.status(200).render('index', {app});
        } else {
            res.status(404).send('Not found');
        }
    });
};


const renderApp = function(renderProps) {
    const reducer = combineReducers(reducers);
    const store = createStore(reducer);
    const Route = React.createElement(RoutingContext, renderProps);
    const App = React.createElement(Provider, {store}, Route);
    return renderToString(App);
};
