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
  height: '500px', // Slightly increased height for better layout
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)', // Added shadow on hover
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

  if (loading) return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;
  if (error) return <Typography align="center" color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Popular Movies
      </Typography>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
            <StyledCard onClick={() => handleCardClick(movie.imdbID)}>
              <CardMedia
                component="img"
                image={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
                alt={movie.Title}
                sx={{ height: 300, objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                  {movie.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Release Date: {movie.Year}
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
