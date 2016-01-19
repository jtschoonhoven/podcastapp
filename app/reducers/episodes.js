"use strict";

const initialState = {
    isLoading: true,
    collection: []
};


module.exports.reducer = function(state, action) {
    state = state || initialState;
    let update = {};

    switch (action.type) {
        case 'PLAYBACK_TOGGLE':
            update = {};
            break;
    }
    return Object.assign({}, state, update);
};


module.exports.actions = function(dispatch) {
    const action = (type, body) => dispatch(Object.assign({type}, body || {}));
    return {
        PLAYBACK_TOGGLE: () => action('PLAYBACK_TOGGLE')
    };
};
