"use strict";
const playback = require('./playback');
const episodes = require('./episodes');
const shows = require('./shows');


module.exports.reducers = {
    playback: playback.reducer,
    episodes: episodes.reducer,
    shows: shows.reducer
};


/**
 * Return namespaced object of action creators.
 */
module.exports.getActions = function(dispatch) {
    const actions = {
        playback: playback.actions,
        episodes: episodes.actions,
        shows: shows.actions
    };
    return combineActions(actions, dispatch);
};


/**
 * Inject the dispatch method to return namespaced action creators.
 */
const combineActions = function(actionsObj, dispatch) {
    for (const actionGroup in actionsObj) {
        // if (!typeof actionsObj[actionGroup] === 'function') { continue; }
        actionsObj[actionGroup] = actionsObj[actionGroup](dispatch);
    }
    return actionsObj;
};
