import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import scraperReducer from '../features/scraper/scraperSlice';

export const store = configureStore({
  reducer: {
    scraper: scraperReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
