"use strict";

const combineReducers = require('redux').combineReducers;
const playback = require('./playback');
const episodes = require('./episodes');
const shows = require('./shows');


module.exports.reducers = combineReducers({
    playback: playback.reducer,
    episodes: episodes.reducer,
    shows: shows.reducer
});


module.exports.getActions = function(dispatch) {
    const actions = [
        playback.actions,
        episodes.actions,
        shows.actions
    ];
    return combineActions(actions, dispatch);
};


const combineActions = function(actionsArray, dispatch) {
    const combinedActions = {};
    for (const i in actionsArray) {
        if (!typeof actionsArray[i] === 'function') { continue; }
        Object.assign(combinedActions, actionsArray[i](dispatch));
    }
    return combinedActions;
};
