import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slides/counterSlides";
import userReducer from "./slides/userSlides";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// counter: counterReducer: Đặt counterReducer để xử lý state của phần counter trong Redux store.
//user: userReducer: Đặt userReducer để xử lý state của phần user trong Redux store.
const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
