import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.ts';
import areaReducer from './slices/areaSlice.ts';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["user"],
};

const rootReducer = combineReducers({
  user: userReducer,
  farmArea: areaReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;