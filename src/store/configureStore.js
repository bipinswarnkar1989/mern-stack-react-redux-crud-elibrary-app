// ./src/store/configureStore.js
import { createStore, compose, applyMiddleware } from 'redux';
/* you can handle asynchronous
requests in a React Redux environment using Redux Thunk. */
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState){
  return createStore(rootReducer,initialState,
   //Apply to store
  applyMiddleware(thunk)
  );
}
