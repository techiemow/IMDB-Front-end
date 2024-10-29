// src/components/DisplayActors.js
import { Card, CardContent, CardMedia, Container, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import "./DisplayActors.css"; // Create a CSS file for styling

const DisplayActors = () => {
  const actors = useSelector((state) => state.actors.actors); // Access actors from Redux state
  const loading = useSelector((state) => state.actors.loading); // Loading state
  const error = useSelector((state) => state.actors.error); // Error state
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle card click to navigate to actor details
  const handleCardClick = (id) => {
    navigate(`/actor/${id}`); // Navigate to the actor details page with the actor ID
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
            onClick={() => handleCardClick(actor._id)} // Add onClick to the Card
            style={{ cursor: 'pointer' }} // Change cursor style for better UX
          >
            {actor.ActorImages.length > 0 && (
              <CardMedia
                component="img"
                alt={actor.name}
                height="200" // Adjusted height for smaller cards
                image={actor.ActorImages[0]} // Display the first image
              />
            )}
            <CardContent>
              <Typography variant="h6" component="div">
                {actor.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Bio: {actor.bio}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date of Birth: {new Date(actor.dob).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default DisplayActors;
