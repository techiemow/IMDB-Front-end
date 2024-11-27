import React, { useState, useEffect } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
} from '@mui/material';

const FavoriteMovies = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((movie) => movie.imdbID !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Favorite Movies
      </Typography>
      <Grid container spacing={2}>
        {favorites.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
            <Card>
              <CardMedia
                component="img"
                image={movie.Poster}
                alt={movie.Title}
              />
              <CardContent>
                <Typography variant="h6">{movie.Title}</Typography>
                <Typography variant="body2">Year: {movie.Year}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeFromFavorites(movie.imdbID)}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FavoriteMovies;
