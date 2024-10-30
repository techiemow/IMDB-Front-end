import { Card, CardContent, CardMedia, Container, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./DisplayMovies.css"; // Create a CSS file for styling

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
      <div className="movies-container">
        {movies.map((movie) => (
          <Card
            className="movie-card"
            key={movie._id}
            onClick={() => handleCardClick(movie._id)}
          >
            {movie.movieImages.length > 0 && (
              <CardMedia
                component="img"
                alt={`${movie.name} image`}
                className="movie-image"
                image={movie.movieImages[movie.movieImages.length - 1]} // Display the last image
              />
            )}
            <CardContent className="card-content">
              <Typography variant="h6" component="div">
                {movie.name}
              </Typography>
              <Typography variant="body2" color="text.secondary " className="movie-plot mb-2">
                <b>Plot: </b>{movie.plot}
                <br />
              
              </Typography>
              <Typography variant="body2" color="text.secondary" className='mb-2"'>
                Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
              </Typography>
            </CardContent>
            <Button 
              size="small" 
              onClick={(e) => { 
                e.stopPropagation(); // Prevent card click event
                handleCardClick(movie._id);
              }}
              className="view-details-button"
            >
              View Details
            </Button>
            <br />
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default DisplayMovies;
