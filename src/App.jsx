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
      console.log(response);
      
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

  useEffect(() => {
    fetchMovies();
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
