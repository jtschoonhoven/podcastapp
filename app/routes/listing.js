const React = require('react');
const ReactDOM = require('react-dom');
const Listing = require('../components/listing');

const route = function() {
    ReactDOM.render(
      <Listing></Listing>,
      document.getElementById('app')
    );
};

module.exports = route;
