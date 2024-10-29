// src/pages/PopularActorInDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const PopularActorInDetails = () => {
  const { id } = useParams();  // Get the actor ID from the URL parameters
  const [actorDetails, setActorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 
  useEffect(() => {
    const fetchActorDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/person/${id}?api_key=0271e07fb7d5c0183c6e21f0a2a0932a&language=en-US`
        );
        setActorDetails(response.data);  // Set the actor details in state
      } catch (err) {
        console.error(err);
        setError('Failed to fetch actor details');  // Handle error
      } finally {
        setLoading(false);  // Set loading to false after fetching
      }
    };

    fetchActorDetails();
  }, [id]);

  if (loading) return <CircularProgress />;  // Show loader while fetching data
  if (error) return <div>{error}</div>;  // Display error message

  return (
    <Box sx={{ padding: 2 }}>
      {actorDetails && (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            {actorDetails.name}
          </Typography>
          {actorDetails.profile_path && (
            <Avatar
              src={`https://image.tmdb.org/t/p/w500${actorDetails.profile_path}`}
              alt={actorDetails.name}
              sx={{ width: 200, height: 200, margin: '0 auto' }}
            />
          )}
          <Typography variant="body1" align="center" gutterBottom>
            {actorDetails.biography || 'No biography available'}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2', color: 'white' }}> {/* Change the background color */}
    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}><u>Detail</u></TableCell> {/* Change text color */}
    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}><u>Information</u></TableCell> {/* Change text color */}
  </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Birthday</TableCell>
                  <TableCell>{actorDetails.birthday || 'N/A'}</TableCell>
                </TableRow>
                <TableRow> 
                  <TableCell>Place of Birth</TableCell>
                  <TableCell>{actorDetails.place_of_birth || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Gender</TableCell>
                  <TableCell>{actorDetails.gender === 1 ? 'Female' : 'Male'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Known For</TableCell>
                  <TableCell>{actorDetails.known_for_department || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Popularity</TableCell>
                  <TableCell>{actorDetails.popularity ? actorDetails.popularity.toFixed(1) : 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>IMDB ID</TableCell>
                  <TableCell>
                    <a href={`https://www.imdb.com/name/${actorDetails.imdb_id}`} target="_blank" rel="noopener noreferrer">
                      {actorDetails.imdb_id}
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Homepage</TableCell>
                  <TableCell>
                    <a href={actorDetails.homepage} target="_blank" rel="noopener noreferrer">
                      {actorDetails.homepage}
                    </a>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Deathday</TableCell>
                  <TableCell>{actorDetails.deathday || 'N/A'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
       <Box sx={{ marginTop: 2, textAlign: 'center' }}>
            <Button variant="contained" onClick={() => navigate("/ActorsHome")}>
              Back to Home
            </Button>
          </Box>
    </Box>
  );
};

export default PopularActorInDetails;
