// src/redux/actorsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  actors: [],
  loading: false,
  error: null,
};

const actorsSlice = createSlice({
  name: 'actors',
  initialState,
  reducers: {
    setActors: (state, action) => {
      state.actors = action.payload;
    },
    setActorLoading: (state, action) => {
      state.loading = action.payload;
    },
    setActorError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setActors, setActorLoading, setActorError } = actorsSlice.actions;

export default actorsSlice.reducer;
