"use strict";

const initialState = {
    episodeId: null,
    playing: false,
    fetching: false,
    length: 0,
    progress: 0,
    volume: 1,
    buffered: 0,
    episode: {},
    fetch_err: false,
    fetch_msg: null
};


module.exports.reducer = function(state, action) {
    state = state || initialState;
    let update = {};

    switch (action.type) {
        case 'PLAYBACK_FETCH':
            update = {fetching: true};
            break;
        case 'PLAYBACK_FETCH_SUCCESS':
            update = {fetching: false, fetch_msg: null, fetch_err: false, episode: action.value};
            break;
        case 'PLAYBACK_FETCH_FAILURE':
            const fetch_msg = action.fetch_msg || 'Failed to load episode.';
            update = {fetching: false, fetch_err: true, fetch_msg};
            break;
        case 'PLAYBACK_TOGGLE':
            update = {playing: !state.playing};
            break;
        case 'PLAYBACK_SET_PROGRESS':
            update = {progress: action.value};
            break;
        case 'PLAYBACK_SET_BUFFERED':
            update = {buffered: action.value};
            break;
        case 'PLAYBACK_SET_VOLUME':
            update = {volume: action.value};
            break;
    }
    return Object.assign({}, state, update);
};


module.exports.actionCreators = {
    PLAYBACK_TOGGLE: () => ({type: 'PLAYBACK_TOGGLE'}),
    PLAYBACK_SET_VOLUME: (vol) => ({type: 'PLAYBACK_SET_VOLUME', value: vol}),
    PLAYBACK_FETCH: () => ({type: 'PLAYBACK_FETCH'}),
    PLAYBACK_FETCH_SUCCESS: (episode) => ({type: 'PLAYBACK_FETCH_SUCCESS', value: episode}),
    PLAYBACK_FETCH_FAILURE: (fetch_msg) => ({type: 'PLAYBACK_FETCH_FAILURE', fetch_msg}),
    PLAYBACK_SET_PROGRESS: (value) => ({type: 'PLAYBACK_SET_PROGRESS', value}),
    PLAYBACK_SET_BUFFERED: (value) => ({type: 'PLAYBACK_SET_BUFFERED', value})
};
