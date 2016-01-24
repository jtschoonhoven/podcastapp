"use strict";

const initialState = {
    collection: [],
    fetching: false,
    fetch_err: false,
    fetch_msg: null
};


module.exports.reducer = function(state, action) {
    state = state || initialState;
    let update = {};

    switch (action.type) {
        case 'SHOWS_FETCH':
            update = {fetching: true};
            break;
        case 'SHOWS_FETCH_SUCCESS':
            const collection = state.collection.concat(action.items);
            update = {fetching: false, fetch_err: false, fetch_msg: null, collection};
            break;
        case 'SHOWS_FETCH_FAILURE':
            const fetch_msg = action.fetch_msg || 'Failed to retrieve shows.';
            update = {fetching: false, fetch_err: true, fetch_msg};
            break;
    }
    return Object.assign({}, state, update);
};


module.exports.actionCreators = {
    SHOWS_FETCH: () => ({type: 'SHOWS_FETCH'}),
    SHOWS_FETCH_SUCCESS: (items) => ({type: 'SHOWS_FETCH_SUCCESS', items}),
    SHOWS_FETCH_FAILURE: (fetch_msg) => ({type: 'SHOWS_FETCH_FAILURE', fetch_msg})
};
