"use strict";

const initialState = {
    episodeId: null,
    playing: false,
    progress: 0,
    volume: 100,
    buffered: 0
};


module.exports.reducer = function(state, action) {
    state = state || initialState;
    let update = {};

    switch (action.type) {
        case 'PLAYBACK_SET_EPISODE_ID':
            update = {episodeId: state.value};
            break;
        case 'PLAYBACK_TOGGLE':
            update = {playing: !state.playing};
            break;
        case 'PLAYBACK_SET_PROGRESS':
            update = {progress: action.value};
            break;
        case 'PLAYBACK_SET_VOLUME':
            update = {volume: action.value};
            break;
        case 'PLAYBACK_SET_BUFFERED':
            update = {buffered: action.value};
            break;
        default:
            console.warn(`Action ${action.type} not recognized.`);
    }
    return Object.assign({}, state, update);
};


module.exports.actionCreators = {
    PLAYBACK_TOGGLE: () => ({type: 'PLAYBACK_TOGGLE'})
};
