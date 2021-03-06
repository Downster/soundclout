import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import commentsReducer from './comments';
import genresReducer from './genres';
import likesReducer from './likes';
import selectedSongReducer from './selectedSong';
import sessionReducer from './session';
import songPlayReducer from './songPlay';
import songsReducer from './songs'
import userLikesReducer from './userLikes';

const rootReducer = combineReducers({
    session: sessionReducer,
    songs: songsReducer,
    currentSong: songPlayReducer,
    selectedSong: selectedSongReducer,
    comments: commentsReducer,
    likes: likesReducer,
    genres: genresReducer,
    userLikes: userLikesReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};



export default configureStore;