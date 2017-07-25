// ./src/reducers/index.js
import { combineReducers } from 'redux';
import { booksReducer, bookReducer } from './bookReducers';
import { cartReducers } from './cartReducers';

export default combineReducers({
  books: booksReducer,
  book: bookReducer,
  cart: cartReducers,
  // More reducers if there are
  // can go here
});
