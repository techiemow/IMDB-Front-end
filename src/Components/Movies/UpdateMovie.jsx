import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid, TextField, Button, Typography } from '@mui/material';

import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import UploadImage from '../../Helpers/UploadImage';
import { apiurl } from '../../../Constants/Apiurl';
import IMDBContext from '../../../Context/Context';

const UpdateMovie = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    releaseDate: '',
    plot: '',
    movieImages: [],
    tmdbId: "",
    actors: [], // Array of actor objects
    producer: {}, // Single producer object
  });

  const { id } = useParams(); // Get the movie ID from URL parameters
  const navigate = useNavigate();
  const {fetchMovies} = useContext(IMDBContext)

  const fetchMovieData = async () => {
    try {
      const response = await axios.get(`${apiurl}/movie/${id}`, { withCredentials: true });
      console.log("Response Data:", response.data); // Log response data for debugging
      if (response.data) {
        const { name, releaseDate, plot, movieImages, actors, producer } = response.data;
        setFormValues({
          name,
          releaseDate: releaseDate.split('T')[0], // Format the date for input
          plot,
          movieImages,
          actors, // Array of actor objects
          producer, // Producer object
        });
      } else {
        toast.error('Error fetching movie data.');
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
      toast.error('Error fetching movie data.');
    }
  };
  
  

  useEffect(() => {
    if (id) {
      fetchMovieData(); // Fetch movie data if an ID is present
    }
  }, [id]);

  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await UploadImage(file);
        setFormValues((prev) => ({
          ...prev,
          movieImages: [...prev.movieImages, imageUrl]
        }));
      } catch (error) {
        console.error("Upload failed", error);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`${apiurl}/UpdateMovie/${id}`, formValues, { withCredentials: true }); // Update existing movie

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/"); // Navigate back to the main page or another page after successful update
        fetchMovies() // Fetch updated movies after successful update
      } else {
        toast.error('Error saving the movie. Please try again later.');
      }
    } catch (error) {
      console.error('Error saving the movie:', error);
      toast.error('Error saving the movie. Please try again later.');
    }
  };

 return (
  <Container maxWidth="md">
    <Typography variant="h4" align="center" gutterBottom>
      Update Movie
    </Typography>
    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Movie Name"
            fullWidth
            value={formValues.name}
            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Release Date"
            type="date"
            fullWidth
            value={formValues.releaseDate}
            onChange={(e) => setFormValues({ ...formValues, releaseDate: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Plot"
            fullWidth
            multiline
            rows={4}
            value={formValues.plot}
            onChange={(e) => setFormValues({ ...formValues, plot: e.target.value })}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="upload-image"
            type="file"
            onChange={handleUploadImage}
          />
          <label htmlFor="upload-image">
            <Button variant="contained" component="span">
              Upload Movie Image
            </Button>
          </label>
        </Grid>

        {/* Display Actors */}
        <Grid item xs={12}>
          <Typography variant="h6">Actors</Typography>
          {formValues.actors.map((actor, index) => (
            <div key={index}>
              <Typography>{actor.name} (Gender: {actor.gender}, DOB: {new Date(actor.dob).toLocaleDateString()})</Typography>
            </div>
          ))}
        </Grid>

        {/* Display Producer */}
        <Grid item xs={12}>
          <Typography variant="h6">Producer</Typography>
          {formValues.producer.name ? (
            <Typography>{formValues.producer.name} (Gender: {formValues.producer.gender}, DOB: {new Date(formValues.producer.dob).toLocaleDateString()})</Typography>
          ) : (
            <Typography>No producer available.</Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Update Movie
          </Button>
        </Grid>
      </Grid>
    </form>
  </Container>
);
}
export default UpdateMovie;
