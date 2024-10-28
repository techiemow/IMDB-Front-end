import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Typography } from '@mui/material';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import UploadImage from '../Helpers/UploadImage';
import { apiurl } from '../../Constants/Apiurl';

const AddMovieForm = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    releaseDate: '',
    plot: '',
    movieImages: [],
    tmdbId: "",
    actors: [], // Array of actor objects
    producer: {}, // Single producer object
  });

  const generateRandomTmdbId = () => {
    return Math.floor(100000 + Math.random() * 900000); // Generates a random 6-digit number
  };

  const navigate = useNavigate();

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
      const response = await axios.post(`${apiurl}/AddMovie`, formValues, {
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setFormValues({
          name: '',
          releaseDate: '',
          plot: '',
          movieImages: [],
          tmdbId: generateRandomTmdbId(),
          actors: [],
          producer: {},
        });
        navigate("/");
      } else {
        toast.error('Error adding the movie. Please try again later.');
      }
    } catch (error) {
      console.error('Error adding the movie:', error);
      toast.error('Error adding the movie. Please try again later.');
    }
  };

  const handleActorChange = (index, field, value) => {
    const newActors = [...formValues.actors];
    newActors[index] = { ...newActors[index], [field]: value };
    setFormValues({ ...formValues, actors: newActors });
  };

  const handleAddActor = () => {
    setFormValues({ ...formValues, actors: [...formValues.actors, {}] });
  };

  const handleRemoveActor = (index) => {
    const newActors = formValues.actors.filter((_, i) => i !== index);
    setFormValues({ ...formValues, actors: newActors });
  };

  const handleProducerChange = (field, value) => {
    setFormValues({ ...formValues, producer: { ...formValues.producer, [field]: value } });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Add a New Movie
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Movie Title"
              variant="outlined"
              fullWidth
              value={formValues.name}
              onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="tmdbId"
              variant="outlined"
              fullWidth
              value={formValues.tmdbId}
              onChange={(e) => setFormValues({ ...formValues, tmdbId: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Release Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
              value={formValues.releaseDate}
              onChange={(e) => setFormValues({ ...formValues, releaseDate: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Plot Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={formValues.plot}
              onChange={(e) => setFormValues({ ...formValues, plot: e.target.value })}
              required
            />
          </Grid>
          {/* Actors Section */}
          <Grid item xs={12}>
            <Typography variant="h6">Actors</Typography>
            {formValues.actors.map((actor, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={4}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={actor.name || ''}
                    onChange={(e) => handleActorChange(index, 'name', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Gender"
                    variant="outlined"
                    select
                    fullWidth
                    value={actor.gender || ''}
                    onChange={(e) => handleActorChange(index, 'gender', e.target.value)}
                    SelectProps={{ native: true }}
                    required
                  >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </TextField>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="DOB"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    fullWidth
                    value={actor.dob || ''}
                    onChange={(e) => handleActorChange(index, 'dob', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Bio"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    value={actor.bio || ''}
                    onChange={(e) => handleActorChange(index, 'bio', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveActor(index)}
                  >
                    Remove Actor
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Button
              variant="contained"
              onClick={handleAddActor}
            >
              Add Actor
            </Button>
          </Grid>
          {/* Producer Section */}
          <Grid item xs={12}>
            <Typography variant="h6">Producer</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={formValues.producer.name || ''}
                  onChange={(e) => handleProducerChange('name', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Gender"
                  variant="outlined"
                  select
                  fullWidth
                  value={formValues.producer.gender || ''}
                  onChange={(e) => handleProducerChange('gender', e.target.value)}
                  SelectProps={{ native: true }}
                  required
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="DOB"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  fullWidth
                  value={formValues.producer.dob || ''}
                  onChange={(e) => handleProducerChange('dob', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Bio"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  value={formValues.producer.bio || ''}
                  onChange={(e) => handleProducerChange('bio', e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* Movie Images Section */}
          <Grid item xs={12}>
            <input
              id="movieImages"
              name="movieImages"
              type="file"
              multiple
              onChange={handleUploadImage}
              style={{ display: 'none' }}
            />
            <label htmlFor="movieImages">
              <Button variant="contained" component="span">
                Upload Movie Images
              </Button>
            </label>
            <div className="image-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
              {formValues.movieImages.map((el, index) => (
                <div className="image-wrapper" key={index} style={{ position: 'relative', marginRight: '10px' }}>
                  <img src={el} alt={`Movie ${index}`} style={{ width: '100px', height: '100px' }} />
                  <div
                    className="delete-icon"
                    onClick={() => setFormValues({
                      ...formValues,
                      movieImages: formValues.movieImages.filter((_, i) => i !== index),
                    })}
                    style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
                  >
                    <MdDelete />
                  </div>
                </div>
              ))}
            </div>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Movie
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddMovieForm;
