// import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import checkboxReducer from './checkbox-reducer';
import filterReducer from './filter-reducer';
import tiketsReducer from './tikets-reducer';

const rootReducer = combineReducers({
  checkbox: checkboxReducer,
  filter: filterReducer,
  tickets: tiketsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;
