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


const actions = {
    playback: playback.actions,
    episodes: episodes.actions,
    shows: shows.actions
};


/**
 * Return namespaced object of action creators.
 */
module.exports.getActionCreators = dispatch => {
    for (const action in actions) {
        actions[action] = bindActionCreators(actions[action], dispatch);
    }
    return {actions};
};
