import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API_URL } from '../../constants';

const initialState = {
  isFetching: false,
  data: {},
  error: '',
};

export const fetchTicket = createAsyncThunk('ticket/fetch', async (id) => {
  return axios
    .get(API_URL + '/report/' + id)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
});

export const patchComment = createAsyncThunk('ticket/put', async (payload) => {
  return axios
    .patch(API_URL + '/report/' + payload.id, payload.data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
});

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTicket.pending, (state) => {
      state.isFetching = true;
      state.data = {};
      state.error = '';
    });

    builder.addCase(fetchTicket.fulfilled, (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
      state.error = '';
    });

    builder.addCase(fetchTicket.rejected, (state, action) => {
      state.isFetching = false;
      state.data = {};
      state.error = action.error.message;
    });

    // --------------------------------------------------------
    builder.addCase(patchComment.pending, (state) => {
      state.isFetching = true;
      state.data = {};
      state.error = '';
    });

    builder.addCase(patchComment.fulfilled, (state, action) => {
      state.isFetching = false;
      state.data = action.payload;
      state.error = '';
    });

    builder.addCase(patchComment.rejected, (state, action) => {
      state.isFetching = false;
      state.data = {};
      state.error = action.error.message;
    });

    // --------------------------------------------------------
  },
});

export default ticketSlice.reducer;
