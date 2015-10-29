const React = require('react');
const ReactDOM = require('react-dom');
const Dispatcher = require('flux').Dispatcher;
const ReduceStore = require('flux/utils').ReduceStore;

console.log(Dispatcher);
console.log(ReduceStore);

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);
