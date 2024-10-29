import { Card, CardContent, CardMedia, Container, Typography, Grid, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./DisplayMovies.css";

const DisplayMovies = () => {
  const movies = useSelector((state) => state.movies.movies);
  const loading = useSelector((state) => state.movies.loading);
  const error = useSelector((state) => state.movies.error);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCardClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Recently Added Movies
      </Typography>
      <Grid container spacing={2}>
        {movies.map((movie, index) => (
          <Grid item key={movie._id} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, height: '100%' }} onClick={() => handleCardClick(movie._id)} style={{ cursor: 'pointer' }}>
              <div style={{ position: "relative" }}>
                {movie.movieImages.length > 0 && (
                  <CardMedia
                    sx={{ height: 275 }}
                    image={movie.movieImages[movie.movieImages.length - 1]} // Display the last image
                    title={`${movie.name} image`}
                  />
                )}
            
              </div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {movie.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Plot: {movie.plot}</b>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
                </Typography>
                {/* Additional fields can be added here as needed */}
              </CardContent>
              <Button size="small" onClick={() => handleCardClick(movie._id)}>View Details</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DisplayMovies;
