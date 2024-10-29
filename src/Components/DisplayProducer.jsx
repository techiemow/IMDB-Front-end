import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { useSelector } from 'react-redux';
import './DisplayProducers.css'; // Add your custom styles here

const DisplayProducer = () => {
  const producers = useSelector((state) => state.producers.producers);
  const loading = useSelector((state) => state.producers.loading);
  const error = useSelector((state) => state.producers.error);

  console.log(producers);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Featured Producers
      </Typography>
      <Grid container spacing={3}>
        {producers.map((producer) => (
          <Grid item xs={12} sm={6} md={4} key={producer._id}>
            <Card className="producer-card">
              {producer.ProducerImages.length > 0 && (
                <CardMedia
                  component="img"
                  alt={producer.name}
                  height="200" // Adjusted height for producer cards
                  image={producer.ProducerImages[0]} // Display the first image
                />
              )}
              <CardContent>
                <Typography variant="h6" component="div">
                  {producer.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {producer.bio}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Date of Birth: {new Date(producer.dob).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default DisplayProducer;
