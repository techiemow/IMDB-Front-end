// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import MovieReducer from "./MovieReducer"

const store = configureStore({
  reducer: {
    movies: MovieReducer,
  },
});

export default store;
