const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const match = require('react-router').match;
const RoutingContext = require('react-router').RoutingContext;
const routes = require('../app/components/routes').default;

module.exports = (req, res, next) => {
    match({ routes: routes(), location: req.url }, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            const app = renderToString(React.createElement(RoutingContext, renderProps));
            res.status(200).render('index', {title: 'Express', app});
        } else {
            res.status(404).send('Not found');
        }
    });
};
