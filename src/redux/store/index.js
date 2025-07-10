import { legacy_createStore as createStore, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; // updated import
import rootReducer from '../reducers';

// Initial state
const initialState = {};

// Redux Persist configuration
const persistConfig = {
    key: 'primary',
    storage: AsyncStorage,
    keyPrefix: '',
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Setting up composeEnhancers for Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the Redux store with persisted reducer and thunk middleware
const store = createStore(
    persistedReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
);

// Creating the persistor for the store
export const persistor = persistStore(store);

export default store;


