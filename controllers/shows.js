"use strict";
const BaseController = require('./base_controller');

class ShowController extends BaseController {
    constructor() {
        super('public', 'shows');
    }
}

module.exports = new ShowController();
