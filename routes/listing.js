"use strict";

const React = require('react');
const ReactDOMServer = require('react-dom/server');
const Listing = React.createFactory(require('../app/components/listing'));

const app = ReactDOMServer.renderToString(Listing());

module.exports = function(req, res) {
  res.render('index', {title: 'Express', app: app});
};
