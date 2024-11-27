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
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  transition: 'transform 0.2s, box-shadow 0.2s',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  cursor: 'pointer',
  height: '550px',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const Popularmovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=fd0b95eb&s=marvel`
        );
        if (response.data.Response === 'True') {
          setMovies(response.data.Search);
        } else {
          setError(response.data.Error);
        }
      } catch (err) {
        setError('Failed to fetch movies.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const addToFavorites = (movie) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert(`${movie.Title} added to favorites!`);
    } else {
      alert(`${movie.Title} is already in favorites.`);
    }
  };

  const handleCardClick = (movieId) => {
    navigate(`/PopularMovieDetails/${movieId}`); // Redirect to the specific movie's details page
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Popular Movies
      </Typography>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
            <StyledCard onClick={() => handleCardClick(movie.imdbID)}>
              <Typography variant="h6" align="center" gutterBottom>
                {movie.Title}
              </Typography>
              <CardMedia
                component="img"
                image={movie.Poster}
                alt={movie.Title}
                sx={{ height: 300 }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Release Date: {movie.Year}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                  Plot: {movie.Plot || 'No plot available'}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click from firing
                    addToFavorites(movie);
                  }}
                  sx={{ marginTop: 2 }}
                >
                  Add to Favorites
                </Button>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Popularmovies;
