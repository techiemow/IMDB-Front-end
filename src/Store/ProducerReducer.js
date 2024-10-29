import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  producers: [],
  loading: false,
  error: null,
};

const producersSlice = createSlice({
  name: 'producers',
  initialState,
  reducers: {
    setProducers: (state, action) => {
      state.producers = action.payload;
    },
    setProducerLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProducerError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProducers, setProducerLoading, setProducerError } = producersSlice.actions;

export default producersSlice.reducer;
