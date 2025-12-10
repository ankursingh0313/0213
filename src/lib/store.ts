import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './features/uiSlice';
import dataReducer from './features/dataSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      ui: uiReducer,
      data: dataReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
