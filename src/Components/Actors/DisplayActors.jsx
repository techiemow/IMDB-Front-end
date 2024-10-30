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
      <div className="actors-container">
        {actors.map((actor) => (
          <Card
            className="actor-card"
            key={actor._id}
            onClick={() => handleCardClick(actor._id)}
          >
            {actor.ActorImages.length > 0 && (
              <CardMedia
                component="img"
                alt={actor.name}
                className="actor-image"
                image={actor.ActorImages[0]}
                title={`${actor.name} image`}
              />
            )}
            <CardContent className="card-content">
              <Typography gutterBottom variant="h5" component="div">
                {actor.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="actor-bio">
                <b>Bio:</b> {actor.bio}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Date of Birth:</b> {new Date(actor.dob).toLocaleDateString()}
              </Typography>
            </CardContent>
            <Button 
              style={{marginBottom:"20px"}}
              size="small" 
              onClick={(e) => { 
                e.stopPropagation(); // Prevent card click event
                handleCardClick(actor._id);
              }}
              className="view-details-button"
            >
              View Details
            </Button>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default DisplayActors;
