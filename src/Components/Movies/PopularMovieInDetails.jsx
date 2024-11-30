import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  CardMedia,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { toast } from 'react-toastify';

const PopularMovieInDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=fd0b95eb&i=${id}`
        );
        if (response.data.Response === 'True') {
          setMovie(response.data);
        } else {
          setError(response.data.Error);
        }
      } catch (err) {
        setError('Failed to fetch movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const addToFavorites = (movie) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      toast.success(`${movie.Title} added to favorites!`);
    } else {
      toast.error(`${movie.Title} is already in favorites.`);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography>{error}</Typography>;

  return (
    <Container>
      {movie && (
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            {movie.Title}
          </Typography>
          <CardMedia
            component="img"
            sx={{
              height: 400,
              width: 400,
              margin: '0 auto',
              display: 'block',
            }}
            image={movie.Poster}
            alt={movie.Title}
          />
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Plot</TableCell>
                  <TableCell>{movie.Plot}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Genre</TableCell>
                  <TableCell>{movie.Genre}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Runtime</TableCell>
                  <TableCell>{movie.Runtime}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Director</TableCell>
                  <TableCell>{movie.Director}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Actors</TableCell>
                  <TableCell>{movie.Actors}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Language</TableCell>
                  <TableCell>{movie.Language}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Release Date</TableCell>
                  <TableCell>{movie.Released}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>IMDB Rating</TableCell>
                  <TableCell>{movie.imdbRating}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Box Office</TableCell>
                  <TableCell>{movie.BoxOffice || 'N/A'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Awards</TableCell>
                  <TableCell>{movie.Awards}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ textAlign: 'center', marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => addToFavorites(movie)}
            >
              Add to Favorites
            </Button>
            <Button
              variant="outlined"
              sx={{ marginLeft: 2 }}
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default PopularMovieInDetails;
