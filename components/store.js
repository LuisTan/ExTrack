import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore } from 'redux';

import recordsReducer from './RecordsReducer.js';

const persistConfig = {
    key: 'v6',
    storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig,recordsReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);