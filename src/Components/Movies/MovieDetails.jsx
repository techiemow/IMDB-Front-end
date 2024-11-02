import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import axios from 'axios';
import { apiurl } from '../../../Constants/Apiurl';
import IMDBContext from '../../../Context/Context';

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
   
  const {fetchMovies,fetchActors,fetchProducers} = useContext(IMDBContext)

  useEffect(() => {
    // Fetch movie details from your API
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${apiurl}/movie/${id}`); // Adjust the URL as necessary
        const data = response.data;
        console.log(data,"movie details");
        
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchProducers();
    fetchActors();
    fetchMovies();
    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" style={{ color: '#3f51b5' }}>{movie.name}</Typography>
      <div className="flex justify-center mb-4">
        <img 
          src={movie.movieImages[0]} 
          alt={movie.name} 
          style={{ width: '50%', height: 'auto', borderRadius: '8px' }} 
        />
      </div>
      
      {/* Movie Plot and Release Date */}
      <div className='flex flex-col items-center gap-4 mb-4'>
        <Typography variant="body1" className="text-gray-800 text-center mb-2">
          {movie.plot}
        </Typography>
        <Typography variant="body2" className="text-gray-600 text-center">
          Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
        </Typography>
      </div>

      {/* Actors Table */}
      <Typography variant="h6" gutterBottom style={{ color: '#3f51b5' }}>Actors:</Typography>
      <Paper elevation={2} style={{ padding: '16px', marginBottom: '20px' }}>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Gender</th>
                <th className="border border-gray-300 px-4 py-2">DOB</th>
                <th className="border border-gray-300 px-4 py-2">Bio</th>
              </tr>
            </thead>
            <tbody>
              {movie.actors && movie.actors.length > 0 ? (
                movie.actors.map((actor) => (
                  <tr key={actor._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{actor.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{actor.gender}</td>
                    <td className="border border-gray-300 px-4 py-2">{new Date(actor.dob).toLocaleDateString()}</td>
                    <td className="border border-gray-300 px-4 py-2">{actor.bio}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="border border-gray-300 px-4 py-2 text-center">No actors found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Paper>

      {/* Producer Details */}
      <Typography variant="h6" gutterBottom style={{ color: '#3f51b5' }}>Producer:</Typography>
      <Paper elevation={2} style={{ padding: '16px', marginBottom: '40px' }}>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Gender</th>
                <th className="border border-gray-300 px-4 py-2">DOB</th>
                <th className="border border-gray-300 px-4 py-2">Bio</th>
              </tr>
            </thead>
            <tbody>
              {movie.producer ? (
                <tr>
                  <td className="border border-gray-300 px-4 py-2">{movie.producer.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{movie.producer.gender}</td>
                  <td className="border border-gray-300 px-4 py-2">{new Date(movie.producer.dob).toLocaleDateString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{movie.producer.bio}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={4} className="border border-gray-300 px-4 py-2 text-center">No producer found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Paper>

      <Box mt={4} className="flex justify-between" spacing={2} mb={4}>
        <Button onClick={() => navigate('/')} variant="contained" color="primary" style={{ marginRight: '10px' }}>Back</Button>
        <Button onClick={() => {navigate(`/UpdateMovie/${id}`)}} variant="contained" color="secondary">Update</Button>
      </Box>
    </Container>
  );
};

export default MovieDetails;
