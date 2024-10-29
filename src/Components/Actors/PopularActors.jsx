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
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const ActorImage = styled(CardMedia)(({ theme }) => ({
  width: '100%',
  height: 300,
  objectFit: 'cover',
}));

const PopularActors = () => {
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPopularActors = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/person/popular?api_key=0271e07fb7d5c0183c6e21f0a2a0932a&language=en-US&page=1`
        );
        setActors(response.data.results);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch actors');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularActors();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Famous Actors
      </Typography>
      <Grid container spacing={2}>
        {actors.map((actor) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={actor.id}>
            <StyledCard>
              <ActorImage
                component="img"
                image={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
              />
              <CardContent>
                <Typography variant="h6" align="center" gutterBottom>
                  {actor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Known For: {actor.known_for_department}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Popularity: {actor.popularity.toFixed(1)}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularActors;
