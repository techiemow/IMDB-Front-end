// src/components/ActorDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Grid, Box } from '@mui/material';
import axios from 'axios';
import { apiurl } from '../../../Constants/Apiurl';

const ActorDetails = () => {
  const { id } = useParams(); // Get the actor ID from the URL
  const [actor, setActor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch actor details from your API
    const fetchActorDetails = async () => {
      try {
        const response = await axios.get(`${apiurl}/actor/${id}`); // Adjust the URL as necessary
        const data = response.data;
        setActor(data);
      } catch (error) {
        console.error("Error fetching actor details:", error);
      }
    };

    fetchActorDetails();
  }, [id]);

  if (!actor) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom className="text-center">{actor.name}</Typography>
      <div className="flex justify-center mb-4">
        <img 
          src={actor.ActorImages[0]} 
          alt={actor.name} 
          className="w-1/2 h-auto rounded-lg" 
        />
      </div>
      
      <div className='flex flex-col items-center gap-4'>
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
      <Grid container spacing={4} className="mt-4">
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>Movies:</Typography>
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
                      <td className="border border-gray-300 px-4 py-2">{new Date(movie.releaseDate).toLocaleDateString()}</td>
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
        </Grid>
      </Grid>

      <Box mt={2} className="flex justify-between">
        <Button onClick={() => navigate('/')} variant="contained" color="primary">Back</Button>
        <Button onClick={() => {/* Handle update logic here */}} variant="contained" color="secondary">Update</Button>
      </Box>
    </Container>
  );
};

export default ActorDetails;
