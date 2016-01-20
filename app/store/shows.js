"use strict";

const initialState = {
    collection: [],
    featured: []
};


module.exports.reducer = function(state, action) {
    state = state || initialState;
    let update = {};

    switch (action.type) {
        case 'TODO':
            update = {};
            break;
    }
    return Object.assign({}, state, update);
};


module.exports.actionCreators = {
    PLAYBACK_TOGGLE: () => ({type: 'PLAYBACK_TOGGLE'})
};
