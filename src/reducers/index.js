// ./src/reducers/index.js
import { combineReducers } from 'redux';
import { booksReducer, bookReducer } from './bookReducers';
import { favouriteReducers } from './favouriteReducers';

export default combineReducers({
  books: booksReducer,
  book: bookReducer,
  favourites: favouriteReducers,
  // More reducers if there are
  // can go here
});
