import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField, Container, Typography, Grid, Stack, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiurl } from '../../../Constants/Apiurl';
import { toast } from 'react-toastify';
import IMDBContext from '../../../Context/Context';
import UploadImage from '../../Helpers/UploadImage';
import { MdDelete } from 'react-icons/md';
import moment from 'moment';


const UpdateActor = () => {
  const { id } = useParams(); // Get actor ID from URL parameters
  const navigate = useNavigate();
  const { fetchActors } = useContext(IMDBContext);
  
  // State for actor data
  const [actorData, setActorData] = useState({
    name: '',
    gender: '',
    dob: '',
    bio: '',
    ActorImages: [],
    movies: [{ name: '', releaseDate: '', plot: '', movieImages: [] }]
  });

  // Fetch actor data when the component mounts
  useEffect(() => {
    const fetchActorData = async () => {
      try {
        const response = await axios.get(`${apiurl}/actor/${id}`);
        const formattedData = {
          ...response.data,
          dob: moment(response.data.dob).format('YYYY-MM-DD'), // Format the date
          movies: response.data.movies.map((movie) => ({
            ...movie,
            releaseDate: moment(movie.releaseDate).format('YYYY-MM-DD'), // Format the date
          })),
        };
        setActorData(formattedData); // Populate form with existing data
      } catch (error) {
        console.error('Error fetching actor data:', error);
      }
    };

    fetchActorData();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setActorData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle image upload
  const handleUploadImage = async (event, type, index) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await UploadImage(file);
        if (type === 'actor') {
          setActorData((prev) => ({
            ...prev,
            ActorImages: [...prev.ActorImages, imageUrl],
          }));
        } else if (type === 'movie') {
          const updatedMovies = [...actorData.movies];
          updatedMovies[index].movieImages.push(imageUrl);
          setActorData((prev) => ({
            ...prev,
            movies: updatedMovies,
          }));
        }
      } catch (error) {
        console.error("Upload failed", error);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Actor data before update:', actorData); // Log data before submit

    try {
      const response = await axios.put(`${apiurl}/UpdateActor/${id}`, actorData, { withCredentials: true });
      console.log('Response:', response.data); // Log response data

      if (response.status === 200) {
        toast.success('Actor updated successfully!');
        fetchActors(); // Fetch updated actor data from API and update context state to reflect the change
        navigate('/ActorsHome'); // Navigate after success
      } else {
        toast.error('Failed to update actor. Please try again.');
      }
    } catch (error) {
      console.error('Error updating actor:', error);
      toast.error('An error occurred while updating the actor.');
    }
  };

  // Handle movie change
  const handleMovieChange = (index, updatedMovie) => {
    const updatedMovies = [...actorData.movies];
    updatedMovies[index] = updatedMovie;
    setActorData((prev) => ({ ...prev, movies: updatedMovies }));
  };

  const addMovie = () => {
    setActorData((prev) => ({
      ...prev,
      movies: [...prev.movies, { name: '', releaseDate: '', plot: '', movieImages: [] }],
    }));
  };

  const removeMovie = (index) => {
    const updatedMovies = actorData.movies.filter((_, i) => i !== index);
    setActorData((prev) => ({ ...prev, movies: updatedMovies }));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Update Actor
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={actorData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Gender"
              name="gender"
              select
              fullWidth
              value={actorData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={actorData.dob}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Movies</Typography>
            {actorData.movies.map((movie, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Grid container spacing={2}>
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
                    <Button variant="contained" component="label">
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
                              const updatedMovies = [...actorData.movies];
                              updatedMovies[index].movieImages = updatedMovies[index].movieImages.filter((_, i) => i !== imgIndex);
                              setActorData((prev) => ({ ...prev, movies: updatedMovies }));
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
              </Box>
            ))}
            <Button variant="outlined" color="primary" onClick={addMovie}>
              Add Another Movie
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bio"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              required
              value={actorData.bio}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Upload Actor Images
              <input
                type="file"
                hidden
                onChange={(e) => handleUploadImage(e, 'actor')}
              />
            </Button>
            <div className="image-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
              {actorData.ActorImages.map((el, index) => (
                <div className="image-wrapper" key={index} style={{ position: 'relative', marginRight: '10px' }}>
                  <img src={el} alt={`Actor ${index}`} style={{ width: '100px', height: '100px' }} />
                  <div
                    className="delete-icon"
                    onClick={() => {
                      const updatedImages = actorData.ActorImages.filter((_, i) => i !== index);
                      setActorData((prev) => ({ ...prev, ActorImages: updatedImages }));
                    }}
                    style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
                  >
                    <MdDelete />
                  </div>
                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={12} style={{marginBottom:"20px"}}>
            <Button variant="outlined" color="error " onClick={()=>{navigate("/ActorsHome")}} style={{marginRight:"50px"}}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Update Actor
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UpdateActor;

