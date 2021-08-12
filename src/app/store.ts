import { configureStore } from '@reduxjs/toolkit';
import mainPageSlice from '../components/MainPage/MainPageSlice';

const store = configureStore({
  reducer: {
    mainPage: mainPageSlice,
  },
});

export type StateType = ReturnType<typeof store.getState>

export default store;
