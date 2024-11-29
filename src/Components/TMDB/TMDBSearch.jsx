import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?apikey=fd0b95eb&s=${query}`
        );
        if (response.data.Response === 'True') {
          setResults(response.data.Search);
        } else {
          setError(response.data.Error);
          setResults([]);
        }
      } catch {
        setError('Failed to fetch results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (!query) {
    return (
      <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>
        Please use the search bar to find movies.
      </Typography>
    );
  }

  return (
    <Container>
      {error && (
        <Typography color="error" align="center" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}
      {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {results.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <CardMedia
                component="img"
                sx={{ height: 300, objectFit: 'cover' }}
                image={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
                alt={movie.Title}
              />
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center', // Center content vertically
                  alignItems: 'center',      // Center content horizontally
                  textAlign: 'center',       // Center text
                  flexGrow: 1,               // Allow content to grow and center within card
                }}
              >
                <Typography variant="h6" noWrap>
                  {movie.Title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {movie.Year}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: 'flex',
                  justifyContent: 'center', // Center button horizontally
                  alignItems: 'center',      // Center button vertically
                }}
              >
                <Button
                  component={Link}
                  to={`/PopularMovieDetails/${movie.imdbID}`}
                  variant="contained"
                  size="small"
                  color="primary"
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SearchResults;
