"use strict";

const initialState = {
    episodeId: null,
    playing: false,
    progress: 0,
    volume: 100,
    buffered: 0
};


module.exports = (state, action) => {
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
    }
    return Object.assign({}, state, update);
};
