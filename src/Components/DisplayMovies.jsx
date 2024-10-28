import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useSelector } from 'react-redux';
import './DisplayMovies.css'; // Add your custom styles here

const DisplayMovies = () => {
  const movies = useSelector((state) => state.movies.movies);
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Recently Added Movies
      </Typography>
      <div className="movies-container">
        {movies.map((movie) => (
          <Card className="movie-card" key={movie._id}>
            {movie.movieImages.length > 0 && (
              <CardMedia
                component="img"
                alt={movie.name}
                height="200" // Adjusted height for smaller cards
                image={movie.movieImages[0]} // Display the first image
              />
            )}
            <CardContent>
              <Typography variant="h6" component="div">
                {movie.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {movie.plot}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default DisplayMovies;
