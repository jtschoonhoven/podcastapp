const combineReducers = require('redux').combineReducers;
const playbackReducer = require('./playback');
const episodesReducer = require('./episodes');
const showsReducer = require('./shows');


module.exports = combineReducers({
    playbackReducer,
    episodesReducer,
    showsReducer
});
