"use strict";
const BaseController = require('./base_controller');

class EpisodesController extends BaseController {
    constructor() {
        super('public', 'episodes');
    }
}

module.exports = new EpisodesController();
