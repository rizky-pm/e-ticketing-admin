import { configureStore } from '@reduxjs/toolkit';

import ticketReducer from '../features/ticketSlice';

const store = configureStore({
  reducer: {
    tickets: ticketReducer,
  },
});

export default store;
