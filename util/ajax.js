const request = require('request');

/**
 * Get BASE_URL for environment from config without exposing all config JSON.
 */
const ENV = require('../config').constants.ENV;
const env = process.env[ENV] || 'development';
const baseUrl = require('../config')[env].BASE_URL;

/**
* Return a wrapped request module, configured for localhost.
*/
const ajax = request.defaults({baseUrl, json: true});
module.exports = ajax;
