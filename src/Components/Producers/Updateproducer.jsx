import React, { useContext, useEffect, useState } from 'react';
import { TextField, Button, Typography, Container, MenuItem, Box, Stack, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { apiurl } from '../../../Constants/Apiurl';
import { toast } from 'react-toastify';
import axios from 'axios';
import UploadImage from '../../Helpers/UploadImage';
import { MdDelete } from 'react-icons/md';
import IMDBContext from '../../../Context/Context';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
  };

const UpdateProducer = () => {
    const { id } = useParams(); // Get the producer ID from the URL
  const [formValues, setFormValues] = useState({
    name: '',
    gender: '',
    dob: '',
    bio: '',
    ProducerImages: [],
    movies: [{ name: '', releaseDate: '', plot: '', movieImages: [] }],
  });

  const navigate = useNavigate();

  const {fetchProducers} = useContext(IMDBContext)

  // Function to fetch producer details
  const fetchProducerDetails = async () => {
    try {
      const response = await axios.get(`${apiurl}/producer/${id}`, { withCredentials: true });
      if (response.data.success) {
        // Format the dob and release dates
        const formattedDob = formatDate(response.data.data.dob);
        const moviesWithFormattedDates = response.data.data.movies.map(movie => ({
          ...movie,
          releaseDate: formatDate(movie.releaseDate), // Format releaseDate
        }));

        // Set the form values with formatted dates
        setFormValues({
          ...response.data.data,
          dob: formattedDob, // Set formatted dob
          movies: moviesWithFormattedDates,
        });
      } else {
        toast.error('Error fetching producer details. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching producer details:', error);
      toast.error('Error fetching producer details. Please try again later.');
    }
  };

  useEffect(() => {
    fetchProducerDetails();
  }, [id]);

  // Function to handle image upload
  const handleUploadImage = async (event, type, index) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await UploadImage(file);
        if (type === 'producer') {
          setFormValues((prev) => ({
            ...prev,
            ProducerImages: [...prev.ProducerImages, imageUrl],
          }));
        } else if (type === 'movie') {
          const updatedMovies = [...formValues.movies];
          updatedMovies[index].movieImages.push(imageUrl);
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
      const response = await axios.put(`${apiurl}/UpdateProducer/${id}`, formValues, {
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchProducers()
        navigate("/ProducersHome");
      } else {
        toast.error('Error updating the producer. Please try again later.');
      }
    } catch (error) {
      console.error('Error updating the producer:', error);
      toast.error('Error updating the producer. Please try again later.');
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

  const handleCancel = () => {
    navigate('/ActorsHome');
  };

  return (
    <Container maxWidth="sm">
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Update Producer
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
          InputLabelProps={{ shrink: true }}
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
                value={movie.releaseDate} // This should now be correctly formatted
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
                onClick={() => {
                  const updatedProducerImages = formValues.ProducerImages.filter((_, i) => i !== index);
                  setFormValues((prev) => ({ ...prev, ProducerImages: updatedProducerImages }));
                }}
                style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
              >
                <MdDelete />
              </div>
            </div>
          ))}
        </div>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Button type="submit" variant="contained">
            Update Producer
          </Button>
          <Button variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Box>
  </Container>
);
};
export default UpdateProducer ;
