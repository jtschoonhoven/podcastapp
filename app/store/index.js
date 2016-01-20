"use strict";
const bindActionCreators = require('redux').bindActionCreators;
const playback = require('./playback');
const episodes = require('./episodes');
const shows = require('./shows');


module.exports.reducers = {
    playback: playback.reducer,
    episodes: episodes.reducer,
    shows: shows.reducer
};


const actionCreators = {
    playback: playback.actionCreators,
    episodes: episodes.actionCreators,
    shows: shows.actionCreators
};


/**
 * Return namespaced object of action creators.
 */
module.exports.getActionCreators = dispatch => {
    for (const a in actionCreators) {
        actionCreators[a] = bindActionCreators(actionCreators[a], dispatch);
    }
    return {actionCreators};
};
