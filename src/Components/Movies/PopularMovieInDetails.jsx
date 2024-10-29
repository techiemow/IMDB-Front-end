import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { Container, Typography, CircularProgress, Box, CardMedia, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const PopularMovieInDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=0271e07fb7d5c0183c6e21f0a2a0932a&language=en-US`
        );
        setMovie(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      {movie && (
        <Box sx={{ padding: 2 }}>
          {/* Movie Title */}
          <Typography variant="h4" align="center" gutterBottom>
            {movie.title}
          </Typography>

          {/* Poster Image */}
          <CardMedia
            
            component="img"
            height="100" // Reduced height
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />

          {/* Movie Details in Table */}
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
            <TableHead>
  <TableRow sx={{ backgroundColor: '#1976d2', color: 'white' }}> {/* Change the background color */}
    <TableCell sx={{ fontWeight: 'bold', color: 'white' }}><u>Detail</u></TableCell> {/* Change text color */}
    <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}><u>Information</u></TableCell> {/* Change text color */}
  </TableRow>
</TableHead>

              <TableBody>
                <TableRow>
                  <TableCell>Original Title</TableCell>
                  <TableCell align="right">{movie.original_title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Original Language</TableCell>
                  <TableCell align="right">{movie.original_language}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Overview</TableCell>
                  <TableCell align="right">{movie.overview}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Release Date</TableCell>
                  <TableCell align="right">{new Date(movie.release_date).toLocaleDateString()}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Rating</TableCell>
                  <TableCell align="right">{movie.vote_average} ({movie.vote_count} votes)</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Popularity</TableCell>
                  <TableCell align="right">{movie.popularity}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Genres</TableCell>
                  <TableCell align="right">{movie.genres.map(genre => genre.name).join(', ')}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Back Button */}
          <Box sx={{ marginTop: 2, textAlign: 'center' }}>
            <Button variant="contained" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default PopularMovieInDetails;
