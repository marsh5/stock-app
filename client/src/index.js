import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App';
import stockReducer from './reducers/stockReducer'
import searchReducer from './reducers/searchReducer'
import loadingReducer from './reducers/loadingReducer'
import authReducer from './reducers/authReducer'
import modalReducer from './reducers/modalReducer'


const reducer = combineReducers({
  stock: stockReducer,
  search: searchReducer,
  loading: loadingReducer,
  auth: authReducer,
  modal: modalReducer
})

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);

