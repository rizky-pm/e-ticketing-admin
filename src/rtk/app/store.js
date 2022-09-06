import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import ticketsReducer from '../features/ticketsSlice';
import ticketReducer from '../features/ticketSlice';

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    ticket: ticketReducer,
  },
  middleware: getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
