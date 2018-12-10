import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore } from 'redux';

import recordsReducer from './RecordsReducer.js';

const persistConfig = {
    key: 'v15.3',
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, recordsReducer);

export const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const persistor = persistStore(store);