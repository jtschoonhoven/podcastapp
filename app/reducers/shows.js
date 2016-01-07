"use strict";

const initialState = {
    collection: [],
    featured: []
};


module.exports = (state, action) => {
    state = state || initialState;
    let update = {};

    switch (action.type) {
        case 'TODO':
            update = {};
            break;
    }
    return Object.assign({}, state, update);
};
