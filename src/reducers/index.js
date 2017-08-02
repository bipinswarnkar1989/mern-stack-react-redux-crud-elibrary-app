// ./src/reducers/index.js
import { combineReducers } from 'redux';
import { booksReducer, bookReducer } from './bookReducers';
import favourite from './favouriteReducers';

export default combineReducers({
  books: booksReducer,
  book: bookReducer,
  favourite: favourite
  // More reducers if there are
  // can go here
});
