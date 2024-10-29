import React, { useState } from 'react';
import { TextField, Button, Typography, Container, MenuItem, Box, Stack, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { apiurl } from '../../../Constants/Apiurl';
import { toast } from 'react-toastify';
import axios from 'axios';
import UploadImage from '../../Helpers/UploadImage';
import { MdDelete } from 'react-icons/md';

const AddProducer = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    gender: '',
    dob: '',
    bio: '',
    ProducerImages: [],
    movies: [{ name: '', releaseDate: '', plot: '', movieImages: [] }]
  });

  const navigate = useNavigate();

  // Function to handle image upload
  const handleUploadImage = async (event, type, index) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await UploadImage(file);
        if (type === 'producer') {
          setFormValues((prev) => ({
            ...prev,
            ProducerImages: [...prev.ProducerImages, imageUrl], // Fixed reference here
          }));
        } else if (type === 'movie') {
          const updatedMovies = [...formValues.movies];
          updatedMovies[index].movieImages.push(imageUrl); // Add the new movie image URL
          setFormValues((prev) => ({
            ...prev,
            movies: updatedMovies,
          }));
        }
      } catch (error) {
        console.error("Upload failed", error);
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${apiurl}/AddNewProducer`, formValues, {
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setFormValues({
          name: '',
          gender: '',
          dob: '',
          bio: '',
          ProducerImages: [], 
          movies: [{ name: '', releaseDate: '', plot: '', movieImages: [] }],
        });
        navigate("/ActorsHome");
      } else {
        toast.error('Error adding the producer. Please try again later.');
      }
    } catch (error) {
      console.error('Error adding the producer:', error);
      toast.error('Error adding the producer. Please try again later.');
    }
  };

  const handleMovieChange = (index, updatedMovie) => {
    const updatedMovies = [...formValues.movies];
    updatedMovies[index] = updatedMovie;
    setFormValues((prev) => ({ ...prev, movies: updatedMovies }));
  };

  const addMovie = () => {
    setFormValues((prev) => ({
      ...prev,
      movies: [...prev.movies, { name: '', releaseDate: '', plot: '', movieImages: [] }],
    }));
  };

  const removeMovie = (index) => {
    const updatedMovies = formValues.movies.filter((_, i) => i !== index);
    setFormValues((prev) => ({ ...prev, movies: updatedMovies }));
  };

  // Function to handle Cancel button click
  const handleCancel = () => {
    navigate('/ActorsHome');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Add New Producer
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={formValues.name}
            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
          />
          <TextField
            select
            label="Gender"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={formValues.gender}
            onChange={(e) => setFormValues({ ...formValues, gender: e.target.value })}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            label="Date of Birth"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            InputLabelProps={{
              shrink: true,
            }}
            value={formValues.dob}
            onChange={(e) => setFormValues({ ...formValues, dob: e.target.value })}
          />
          
          <Typography variant="h6">Movies</Typography>
          {formValues.movies.map((movie, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={6}>
                <TextField
                  label="Movie Name"
                  variant="outlined"
                  fullWidth
                  value={movie.name}
                  onChange={(e) => handleMovieChange(index, { ...movie, name: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Release Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  fullWidth
                  value={movie.releaseDate}
                  onChange={(e) => handleMovieChange(index, { ...movie, releaseDate: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Plot"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  value={movie.plot}
                  onChange={(e) => handleMovieChange(index, { ...movie, plot: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ mt: 2 }}
                >
                  Upload Movie Images
                  <input
                    type="file"
                    hidden
                    onChange={(e) => handleUploadImage(e, 'movie', index)}
                  />
                </Button>
                <div className="image-container" style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                  {movie.movieImages.map((imgUrl, imgIndex) => (
                    <div className="image-wrapper" key={imgIndex} style={{ position: 'relative', marginRight: '10px' }}>
                      <img src={imgUrl} alt={`Movie Image ${imgIndex}`} style={{ width: '100px', height: '100px' }} />
                      <div
                        className="delete-icon"
                        onClick={() => {
                          const updatedMovies = [...formValues.movies];
                          updatedMovies[index].movieImages = updatedMovies[index].movieImages.filter((_, i) => i !== imgIndex);
                          setFormValues((prev) => ({ ...prev, movies: updatedMovies }));
                        }}
                        style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  ))}
                </div>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => removeMovie(index)}
                >
                  Remove Movie
                </Button>
              </Grid>
            </Grid>
          ))}
          <Button
            variant="outlined"
            color="primary"
            onClick={addMovie}
            sx={{ mt: 2 }}
          >
            Add Another Movie
          </Button>
          <TextField
            label="Bio"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
            value={formValues.bio}
            onChange={(e) => setFormValues({ ...formValues, bio: e.target.value })}
          />
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
          >
            Upload Producer Images
            <input
              type="file"
              hidden
              onChange={(e) => handleUploadImage(e, 'producer')}
            />
          </Button>
          <div className="image-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {formValues.ProducerImages.map((el, index) => (
              <div className="image-wrapper" key={index} style={{ position: 'relative', marginRight: '10px' }}>
                <img src={el} alt={`Producer ${index}`} style={{ width: '100px', height: '100px' }} />
                <div
                  className="delete-icon"
                  onClick={() => setFormValues({
                    ...formValues,
                    ProducerImages: formValues.ProducerImages.filter((_, i) => i !== index),
                  })}
                  style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
                >
                  <MdDelete />
                </div>
              </div>
            ))}
          </div>
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button variant="outlined" color="error" onClick={handleCancel}>
              Cancel
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default AddProducer;
