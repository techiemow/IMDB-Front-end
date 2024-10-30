// src/components/ActorDetails.js
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper, Grid } from '@mui/material';
import axios from 'axios';
import { apiurl } from '../../../Constants/Apiurl';
import IMDBContext from '../../../Context/Context';

const ActorDetails = () => {
  const { id } = useParams(); // Get the actor ID from the URL
  const [actor, setActor] = useState(null);
  const navigate = useNavigate();
   const {fetchMovies} =  useContext( IMDBContext )

  useEffect(() => {
    // Fetch actor details from your API
    const fetchActorDetails = async () => {
      try {
        const response = await axios.get(`${apiurl}/actor/${id}`);
        const data = response.data;
        console.log('Fetched Actor Data:', response.data); 
        setActor(data);
      } catch (error) {
        console.error("Error fetching actor details:", error);
      }
    };

    fetchActorDetails();
    fetchMovies();
  }, [id]);

  if (!actor) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" style={{ color: '#3f51b5' }}>
        {actor.name}
      </Typography>

      {/* Actor Image and Bio */}
      <div className="flex justify-center mb-4">
        <img 
          src={actor.ActorImages[0]} 
          alt={actor.name} 
          style={{ width: '50%', height: 'auto', borderRadius: '8px' }} 
        />
      </div>

      <div className='flex flex-col items-center gap-4 mb-4'>
        <Typography variant="body1" className="text-gray-800 text-center mb-2">
          {actor.bio}
        </Typography>
        <Typography variant="body2" className="text-gray-600 text-center">
          Date of Birth: {new Date(actor.dob).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" className="text-gray-600 text-center">
          Gender: {actor.gender}
        </Typography>
      </div>

      {/* Movies Section */}
      <Typography variant="h6" gutterBottom style={{ color: '#3f51b5' }}>Movies:</Typography>
      <Paper elevation={2} style={{ padding: '16px', marginBottom: '20px' }}>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Release Date</th>
              </tr>
            </thead>
            <tbody>
              {actor.movies && actor.movies.length > 0 ? (
                actor.movies.map((movie) => (
                  <tr key={movie._id} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{movie.name}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {new Date(movie.releaseDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="border border-gray-300 px-4 py-2 text-center">No movies found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Paper>

      {/* Action Buttons */}
      <Box mt={4} className="flex justify-between" spacing={2} mb={4}>
        <Button onClick={() => navigate('/ActorsHome')} variant="contained" color="primary" style={{ marginRight: '10px' }}>
          Back
        </Button>
        <Button onClick={() => navigate(`/UpdateActor/${id}`)} variant="contained" color="secondary">
          Update
        </Button>
      </Box>
    </Container>
  );
};

export default ActorDetails;
