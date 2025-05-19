//store/index.js
// This file sets up the Redux store for the application
// It imports the configureStore function from @reduxjs/toolkit
// It imports the sessionReducer and spotsReducer from their respective files
// It creates a store using the configureStore function and combines the reducers
// It exports the store and the csrf functions for use in other parts of the application
import { configureStore } from '@reduxjs/toolkit';
import spotsReducer from './spots';
import sessionReducer from './session';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    spots: spotsReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;