// App.js

import './App.css';
import Navbar from './Components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
 // Adjust the import path as needed
import IMDBContext from '../Context/Context';
import { setLoading, setMovies,setError } from './Store/MovieReducer';
import axios from 'axios';
import { apiurl } from '../Constants/Apiurl';
import { setActors, setActorLoading, setActorError } from './Store/ActorReducer';
import { setProducerError, setProducerLoading, setProducers } from './Store/ProducerReducer';

function App() {
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies); // Assuming you have combined reducers properly

  const fetchMovies = async () => {
    dispatch(setLoading(true)); // Start loading
    try {
      const response = await axios.get(`${apiurl}/RecentMovies`, {
        withCredentials: true,
      });
      
      if (response.data.success) {
        setIsLoading(false); 
        dispatch(setMovies(response.data.data)); // Update the movies state
      } else {
        dispatch(setError(response.data.message)); // Handle errors from API response
      }
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      dispatch(setError('Failed to fetch movies')); // Update error state
    } finally {
      dispatch(setLoading(false)); // Stop loading
    }
  };

  const fetchActors = async () => {
    dispatch(setActorLoading(true)); // Start loading
    try {
      const response = await axios.get(`${apiurl}/RecentActors`, { withCredentials: true });
      if (response.data.success) {
        dispatch(setActors(response.data.data)); // Update the actors state
      } else {
        dispatch(setActorError(response.data.message)); // Handle errors from API response
      }
    } catch (error) {
      console.error('Failed to fetch actors:', error);
      dispatch(setActorError('Failed to fetch actors')); // Update error state
    } finally {
      dispatch(setActorLoading(false)); // Stop loading
    }
  };

  
  const fetchProducers = async () => {
    dispatch(setProducerLoading(true));
    try {
        const response = await axios.get(`${apiurl}/RecentProducers`, { withCredentials: true });
        if (response.data.success) {
            dispatch(setProducers(response.data.data));
        } else {
            dispatch(setProducerError(response.data.message));
        }
    } catch (error) {
        console.error('Failed to fetch producers:', error);
        dispatch(setProducerError('Failed to fetch producers'));
    } finally {
        dispatch(setProducerLoading(false));
    }
};


  useEffect(() => {
    fetchMovies();
    fetchActors(); // Fetch actors data as well to populate the dropdown menu in Navbar component.
    fetchProducers();
  }, []);

  return (
    <>
    <IMDBContext.Provider value={{fetchMovies}}>
    <ToastContainer position="top-center" autoClose={5000} />
      <Navbar />
      {isLoading ? (
      <div className="loading">Loading...</div>
    ) : (
      <main className='min-h-[calc(100vh-120px)] source'>
        <Outlet />
    
      </main>
    )}
    </IMDBContext.Provider >
    </>
  );
}

export default App;
