// import {createStore} from 'redux';
// import combineReducers from './reducers.js';

// const store = createStore(combineReducers);

// export default store;

import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel1  from 'redux-persist/lib/stateReconciler/autoMergeLevel1'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native
 
import combineReducers from './reducers.js'
 
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel1,
}
 
const persistedReducer = persistReducer(persistConfig, combineReducers)
 
export default () => {
  let store = createStore(persistedReducer , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  let persistor = persistStore(store)
  return { store, persistor }
}