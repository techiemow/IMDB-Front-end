import React, { useContext, useEffect, useState } from 'react';
import { Container, Grid, TextField, Button, Typography } from '@mui/material';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UploadImage from '../../Helpers/UploadImage';
import { apiurl } from '../../../Constants/Apiurl';
import IMDBContext from '../../../Context/Context';

const AddMovieForm = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    releaseDate: '',
    plot: '',
    movieImages: [],
    tmdbId: "",
    actors: [],
    producer: { ProducerImages: [] },
  });

  const navigate = useNavigate();
  const { fetchMovies ,fetchProducers,fetchActors } = useContext(IMDBContext);

  const generateRandomTmdbId = () => Math.floor(100000 + Math.random() * 900000);

  useEffect(() => {
    setFormValues((prev) => ({ ...prev, tmdbId: generateRandomTmdbId() }));
  }, []);

  const handleUploadImage = async (event, field, index) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = await UploadImage(file);
        setFormValues((prev) => {
          if (field === 'movieImages') {
            return { ...prev, movieImages: [...prev.movieImages, imageUrl] };
          } else if (field === 'actorImages') {
            const newActors = [...prev.actors];
            newActors[index].ActorImages = [...(newActors[index].ActorImages || []), imageUrl];
            return { ...prev, actors: newActors };
          } else if (field === 'producerImages') {
            return {
              ...prev,
              producer: { ...prev.producer, ProducerImages: [...(prev.producer.ProducerImages || []), imageUrl] },
            };
          }
          return prev;
        });
      } catch (error) {
        console.error("Upload failed", error);
        toast.error("Image upload failed. Please try again.");
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formValues);
    
    try {
      const response = await axios.post(`${apiurl}/AddMovie`, formValues, {
        withCredentials: true,
      });
      if (response.data.success) {
        console.log(response.data);
        
        toast.success(response.data.message);
        setFormValues({
          name: '',
          releaseDate: '',
          plot: '',
          movieImages: [],
          tmdbId: generateRandomTmdbId(),
          actors: [],
          producer: { ProducerImages: [] },
        });
        fetchMovies();
        fetchActors(); 
    fetchProducers();

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
    setFormValues({ ...formValues, actors: [...formValues.actors, { ActorImages: [] }] });
  };

  const handleRemoveActor = (index) => {
    setFormValues({ ...formValues, actors: formValues.actors.filter((_, i) => i !== index) });
  };

  const handleProducerChange = (field, value) => {
    setFormValues({ ...formValues, producer: { ...formValues.producer, [field]: value } });
  };

  return (
    <Container maxWidth="md" sx={{ mb: 3 }}>
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
              label="TMDB ID"
              variant="outlined"
              fullWidth
              value={formValues.tmdbId}
              disabled
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
                    <option value="" disabled>Gender</option>
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
                  <input
                    type="file"
                    onChange={(e) => handleUploadImage(e, 'actorImages', index)}
                    style={{ display: 'none' }}
                    id={`actor-image-upload-${index}`}
                  />
                  <label htmlFor={`actor-image-upload-${index}`}>
                    <Button variant="contained" component="span">
                      Upload Actor Image
                    </Button>
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {(actor.ActorImages || []).map((image, i) => (
                      <div key={i} style={{ position: 'relative', margin: '10px' }}>
                        <img src={image} alt={`Actor ${i}`} style={{ width: '100px', height: '100px' }} />
                        <MdDelete
                          style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
                          onClick={() => {
                            const updatedActors = [...formValues.actors];
                            updatedActors[index].ActorImages = updatedActors[index].ActorImages.filter((_, idx) => idx !== i);
                            setFormValues({ ...formValues, actors: updatedActors });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Button variant="outlined" color="error" onClick={() => handleRemoveActor(index)}>
                    Remove Actor
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Button variant="contained" onClick={handleAddActor} sx={{ mt: 2 }}>
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
                  <option value="" disabled>Gender</option>
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
              <Grid item xs={12}>
                <input
                  type="file"
                  onChange={(e) => handleUploadImage(e, 'producerImages')}
                  style={{ display: 'none' }}
                  id="producer-image-upload"
                />
                <label htmlFor="producer-image-upload">
                  <Button variant="contained" component="span">
                    Upload Producer Image
                  </Button>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {(formValues.producer.ProducerImages || []).map((image, i) => (
                    <div key={i} style={{ position: 'relative', margin: '10px' }}>
                      <img src={image} alt={`Producer ${i}`} style={{ width: '100px', height: '100px' }} />
                      <MdDelete
                        style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
                        onClick={() => {
                          const updatedImages = formValues.producer.ProducerImages.filter((_, idx) => idx !== i);
                          setFormValues({ ...formValues, producer: { ...formValues.producer, ProducerImages: updatedImages } });
                        }}
                      />
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </Grid>

          {/* Movie Images Section */}
          <Grid item xs={12}>
            <Typography variant="h6">Movie Images</Typography>
            <input
              type="file"
              onChange={(e) => handleUploadImage(e, 'movieImages')}
              style={{ display: 'none' }}
              id="movie-image-upload"
            />
            <label htmlFor="movie-image-upload">
              <Button variant="contained" component="span">
                Upload Movie Image
              </Button>
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {formValues.movieImages.map((image, i) => (
                <div key={i} style={{ position: 'relative', margin: '10px' }}>
                  <img src={image} alt={`Movie ${i}`} style={{ width: '100px', height: '100px' }} />
                  <MdDelete
                    style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }}
                    onClick={() => {
                      const updatedImages = formValues.movieImages.filter((_, idx) => idx !== i);
                      setFormValues({ ...formValues, movieImages: updatedImages });
                    }}
                  />
                </div>
              ))}
            </div>
          </Grid>

          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddMovieForm;
