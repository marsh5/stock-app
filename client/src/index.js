import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App';
import stockReducer from './reducers/stockReducer';
import searchReducer from './reducers/searchReducer'

const reducer = combineReducers({
  stock: stockReducer,
  search: searchReducer
})

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);

