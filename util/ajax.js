const request = require('request');
const config = require('../config.json');

/**
* Return a wrapped request module, configured for localhost.
*/
const env = process.env[config.constants.ENV] || 'development';
const baseUrl = config[env].BASE_URL;
const ajax = request.defaults({baseUrl, json: true});

module.exports = ajax;
