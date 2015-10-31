"use strict";

const React = require('react');

const MyComponent = React.createClass({
    render: function () {
        return React.createElement(
            "h1",
            null,
            "hey!!!!"
        );
    }
});

module.exports = MyComponent;