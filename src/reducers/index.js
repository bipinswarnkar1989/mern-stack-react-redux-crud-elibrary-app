// ./src/reducers/index.js
import { combineReducers } from 'redux';
import { booksReducer, bookReducer } from './bookReducers';
import favourite from './favouriteReducers';
import appReducer from './appReducers';

export default combineReducers({
  books: booksReducer,
  book: bookReducer,
  favourite: favourite,
  appState: appReducer
  // More reducers if there are
  // can go here
});
