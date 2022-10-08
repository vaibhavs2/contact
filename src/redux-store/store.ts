import {legacy_createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from 'redux-persist/lib/storage';

import {contactReducer} from './contacts/contactReducer';
import {messageReducer} from './messages/messageReducer';
import {Contact, Message} from '../types';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({message: messageReducer, contact: contactReducer}),
);

const store = legacy_createStore(persistedReducer);
const storePersistor = persistStore(store);

export const storeDispatch = store.dispatch;

export function getReduxStore() {
  return store;
}

export function getReduxStorePersister() {
  return storePersistor;
}

export type StoreType = {message: Array<Message>; contact: Array<Contact>};
