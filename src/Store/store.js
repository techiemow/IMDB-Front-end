// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import MovieReducer from './MovieReducer';
import ActorReducer from './ActorReducer';
import ProducerReducer from "./ProducerReducer" // Import the new ActorReducer

const store = configureStore({
  reducer: {
    movies: MovieReducer,
    actors: ActorReducer, 
    producers: ProducerReducer,
  },
});

export default store;
