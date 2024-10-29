// src/components/DisplayProducers.js
import { Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import "./DisplayProducers.css"; // Create a CSS file for styling

const DisplayProducers = () => {
  const producers = useSelector((state) => state.producers.producers); // Access producers from Redux state
  const loading = useSelector((state) => state.producers.loading); // Loading state
  const error = useSelector((state) => state.producers.error); // Error state
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle card click to navigate to producer details
  const handleCardClick = (id) => {
    navigate(`/producer/${id}`); // Navigate to the producer details page with the producer ID
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Featured Producers
      </Typography>
      <div className="producers-container">
        {producers.map((producer) => (
          <Card
            className="producer-card" 
            key={producer._id} 
            onClick={() => handleCardClick(producer._id)} // Add onClick to the Card
          >
            {producer.ProducerImages.length > 0 && (
              <CardMedia
                component="img"
                alt={producer.name}
                className="producer-image" // Apply the CSS class for image
                image={producer.ProducerImages[0]} // Display the first image
              />
            )}
            <CardContent>
              <Typography variant="h6" component="div">
                {producer.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bio: {producer.bio}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date of Birth: {new Date(producer.dob).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default DisplayProducers;
