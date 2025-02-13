import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice"; 

// Configure store with typed reducers
export const store = configureStore({
  reducer: {
    auth: authReducer,
    // tour: TourReducer, // Uncomment if needed
  },
});

// Type definitions for Redux state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
