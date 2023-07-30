import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
<<<<<<< HEAD
import session from './session'
import posts from './posts'
import comments from './comments'

const rootReducer = combineReducers({
  session, posts
=======
import session from './session';
import posts from './posts';
import comments from './comments';
import images from './images';

const rootReducer = combineReducers({
  session, posts, comments, images
>>>>>>> 5b47aeb5177a93752503727f4e7ba261e987ab20
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
