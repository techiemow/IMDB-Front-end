import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const FavoriteMovies = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((movie) => movie.imdbID !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Back Button */}
      <IconButton
        onClick={() => navigate("/")}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          backgroundColor: "#fff",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#333", marginBottom: 4 }}
      >
        Favorite Movies
      </Typography>
      <Grid container spacing={3}>
        {favorites.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.imdbID}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <CardMedia
                component="img"
                image={movie.Poster}
                alt={movie.Title}
                sx={{
                  height: 250,
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <CardContent
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {movie.Title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#666", marginBottom: 2 }}
                >
                  Year: {movie.Year}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeFromFavorites(movie.imdbID)}
                  sx={{
                    transition: "background-color 0.3s, transform 0.3s",
                    "&:hover": {
                      backgroundColor: "#d32f2f",
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FavoriteMovies;

