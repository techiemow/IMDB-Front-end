// src/components/DisplayActors.js
import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useSelector } from 'react-redux';
import './DisplayActors.css'; // Add your custom styles here

const DisplayActors = () => {
  const actors = useSelector((state) => state.actors.actors);
  const loading = useSelector((state) => state.actors.loading);
  const error = useSelector((state) => state.actors.error);

  console.log(actors);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Featured Actors
      </Typography>
      <Grid container spacing={3}>
        {actors.map((actor) => (
          <Grid item xs={12} sm={6} md={4} key={actor._id}>
            <Card className="actor-card">
              {actor.ActorImages.length > 0 && (
                <CardMedia
                  component="img"
                  alt={actor.name}
                  height="200" // Adjusted height for actor cards
                  image={actor.ActorImages[0]} // Display the first image
                />
              )}
              <CardContent>
                <Typography variant="h6" component="div">
                  {actor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {actor.bio}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date of Birth: {new Date(actor.dob).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DisplayActors;
