import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL } from '../../constants';

const initialState = {
  isFetching: false,
  data: [],
  error: '',
};

export const fetchTickets = createAsyncThunk('tickets/fetch', async () => {
  return axios
    .get(API_URL + '/report')
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
});

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending, (state) => {
      state.isFetching = true;
      state.data = [];
      state.error = '';
    });

    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
      state.error = '';
    });

    builder.addCase(fetchTickets.rejected, (state, action) => {
      state.isFetching = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export default ticketSlice.reducer;
