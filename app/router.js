const listing = require('./routes/listing');

const Router = Backbone.Router.extend({

  routes: {
    "": "root"
  },

  root: listing

});

module.exports = Router;
