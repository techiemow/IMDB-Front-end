import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Grid,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#f5f5f5',
    transition: 'transform 0.2s, box-shadow 0.2s',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
    height: '500px', // Set a fixed height for the card
    '&:hover': {
      transform: 'scale(1.05)',
    },
  }));
  
  const OverviewText = styled(Typography)(({ theme }) => ({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: 5, // Limit to 5 lines
    height: '80px', // Adjust height to fit 5 lines approximately
  }));

const Poster = styled(CardMedia)(({ theme }) => ({
  width: '70%', // Make the poster full width
  height: "60%", // Auto height to maintain aspect ratio
  objectFit: 'cover', // Ensure image covers the space
}));

const Popularmovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=0271e07fb7d5c0183c6e21f0a2a0932a&language=en-US&page=1`
        );
        const movieDetails = await Promise.all(
          response.data.results.map(async (movie) => {
            try {
              const detailsResponse = await axios.get(
                `https://api.themoviedb.org/3/movie/${movie.id}?api_key=0271e07fb7d5c0183c6e21f0a2a0932a&language=en-US`
              );

              return {
                id: movie.id,
                title: movie.title,
                Overview: movie.overview,
                release_date: movie.release_date,
                poster_path: movie.poster_path,
                Rating: movie.vote_average,
              };
            } catch (detailsError) {
              console.error(`Error fetching details for movie ID ${movie.id}:`, detailsError);
              return {
                id: movie.id,
                title: movie.title,
                release_date: movie.release_date,
                poster_path: movie.poster_path,
                Overview: 'N/A',
                Rating: 'N/A',
              };
            }
          })
        );
        setMovies(movieDetails);
      } catch (err) {
        console.error(err);
        setError(err.response ? err.response.data.status_message : 'Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Popular Movies
      </Typography>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <StyledCard>
              <Typography variant="h6" align="center" gutterBottom>
                {movie.title}
              </Typography>
              <Poster
                
                component="img"
                className='px-6'
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="body2" className='py-2' color="text.secondary">
                  Release Date: {movie.release_date}
                </Typography>
                <OverviewText variant="body2" color="text.secondary">
                  Plot : {movie.Overview || 'N/A'}
                </OverviewText>
                <Typography variant="body2" className='py-2' color="text.secondary">
                  Rating: {movie.Rating || 'N/A'}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Popularmovies;
