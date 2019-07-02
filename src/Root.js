import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import combinedReducers from './reducers';

const appStore = createStore(combinedReducers, applyMiddleware(thunk));

const Root = props => (
  <Provider store={ appStore }>
    { props.children }
  </Provider>
);

export default Root;
