"use strict";
const BaseController = require('./base_controller');

class ShowsController extends BaseController {
    constructor() {
        super('public', 'shows');
    }
}

module.exports = new ShowsController();
