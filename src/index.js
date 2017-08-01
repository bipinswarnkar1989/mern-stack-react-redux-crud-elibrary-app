import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import routes from './routes';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import configureStore from './store/configureStore';

import * as bookActions from './actions/bookActions';

const store = configureStore();
//store.dispatch(bookActions.fetchBooks());

ReactDOM.render(<Provider store={store}>
  <Router routes={routes} history={browserHistory}/>
  </Provider>,
   document.getElementById('root'));
registerServiceWorker();
