// src/components/DisplayActors.js
import React from 'react';
import { Card, CardContent, CardMedia, Container, Typography, Grid, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./DisplayActors.css";

const DisplayActors = () => {
  const actors = useSelector((state) => state.actors.actors);
  const loading = useSelector((state) => state.actors.loading);
  const error = useSelector((state) => state.actors.error);
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleCardClick = (id) => {
    navigate(`/actor/${id}`);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Featured Actors
      </Typography>
      <Grid container spacing={2}>
        {actors.map((actor) => (
          <Grid item key={actor._id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
              onClick={() => handleCardClick(actor._id)}
            >
              <div style={{ position: "relative" }}>
                {actor.ActorImages.length > 0 && (
                  <CardMedia
                    component="img"
                    alt={actor.name}
                    height="275"
                    image={actor.ActorImages[0]}
                    title={`${actor.name} image`}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
              </div>
              <CardContent sx={{ flexGrow: 1, pb: 0 }}> {/* Adjusted padding-bottom */}
                <Typography gutterBottom variant="h5" component="div">
                  {actor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <b>Bio:</b> {actor.bio}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  <b>Date of Birth:</b> {new Date(actor.dob).toLocaleDateString()}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}> {/* Reduced padding-bottom */}
                <Button size="small" onClick={() => handleCardClick(actor._id)}>
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DisplayActors;
