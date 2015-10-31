const listing = require('./listing');

module.exports = function(router) {

  router.get('/', listing);

};
