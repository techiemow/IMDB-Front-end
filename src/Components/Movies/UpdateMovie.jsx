import React, { useState, useEffect, useContext } from 'react';
import { Container, Grid, TextField, Button, Typography } from '@mui/material';
import { MdDelete } from "react-icons/md";
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
    actors: [],
    producer: { ProducerImages: [] },
  });
  

  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchMovies,
    fetchActors, fetchProducers
  } = useContext(IMDBContext);

  const fetchMovieData = async () => {
    try {
      const response = await axios.get(`${apiurl}/movie/${id}`, { withCredentials: true });
      if (response.data) {
        const { name, releaseDate, plot, movieImages, actors, producer, tmdbId } = response.data;
        setFormValues({
          name,
          releaseDate: releaseDate.split('T')[0],
          plot,
          movieImages,
          actors,
          producer,
          tmdbId,
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
      fetchMovieData();
    }
  }, [id]);

  const handleUploadImage = async (event, field, index) => {
    const file = event.target.files[0];
    if (file) {
        try {
            const imageUrl = await UploadImage(file);
            setFormValues((prev) => {
                const newState = { ...prev };
                if (field === 'movieImages') {
                    newState.movieImages.push(imageUrl);
                } else if (field === 'actorImages') {
                    newState.actors[index].ActorImages = [...(newState.actors[index].ActorImages || []), imageUrl];
                } else if (field === 'producerImages') {
                    newState.producer.ProducerImages = [...(newState.producer.ProducerImages || []), imageUrl];
                }
                return newState;
            });
        } catch (error) {
            console.error("Upload failed", error);
            toast.error("Image upload failed. Please try again.");
        }
    }
};


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formValues);

      const response = await axios.put(`${apiurl}/UpdateMovie/${id}`, formValues, { withCredentials: true });
      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);


        navigate("/");
        fetchMovies();
        fetchProducers();
        fetchActors();
      } else {
        toast.error('Error saving the movie. Please try again later.');
      }
    } catch (error) {
      console.error('Error saving the movie:', error);
      toast.error('Error saving the movie. Please try again later.');
    }
  };

  const formatDateToInput = (date) => {
    if (!date) return ''; // Return empty if date is not provided
    const d = new Date(date);
    // Return in 'yyyy-MM-dd' format
    return d.toISOString().split('T')[0];
  };
  
  const formatDateToOriginal = (inputDate) => {
    if (!inputDate) return null; // Return null if input date is empty
    const [year, month, day] = inputDate.split('-');
    return new Date(year, month - 1, day); // month is 0-indexed in Date
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
    <Container maxWidth="md" style={{ marginBottom: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Update Movie
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Movie Title"
              fullWidth
              value={formValues.name}
              onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="tmdbId"
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
              fullWidth
              value={formValues.releaseDate}
              onChange={(e) => setFormValues({ ...formValues, releaseDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
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

          <Grid item xs={12}>
            <Typography variant="h6">Actors</Typography>
            {formValues.actors.map((actor, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={4}>
                  <TextField
                    label="Name"
                    fullWidth
                    value={actor.name || ''}
                    onChange={(e) => handleActorChange(index, 'name', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Gender"
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
                    fullWidth
                    value={formatDateToInput(actor.dob) || ''} // Format for display
                    onChange={(e) => {
                      const newDate = formatDateToOriginal(e.target.value); // Convert back on change
                      handleActorChange(index, 'dob', newDate); // Update state
                    }}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Bio"
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
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<MdDelete />}
                    onClick={() => handleRemoveActor(index)}
                    sx={{ mb: 2 }}
                  >
                    Remove Actor
                  </Button>
                </Grid>
              </Grid>
            ))}
            <Button variant="contained" onClick={handleAddActor}>
              Add Actor
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Producer</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  label="Name"
                  fullWidth
                  value={formValues.producer?.name || ''}
                  onChange={(e) => handleProducerChange('name', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Gender"
                  select
                  fullWidth
                  value={formValues.producer?.gender || ''}
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
                  label="Producer DOB"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={formatDateToInput(formValues.producer?.dob) || ''} // Format for display
                  onChange={(e) => {
                    const newDate = formatDateToOriginal(e.target.value); // Convert back on change
                    handleProducerChange('dob', newDate); // Update state
                  }}
                  required
                />
              </Grid>




              <Grid item xs={12}>
                <TextField
                  label="Bio"
                  fullWidth
                  multiline
                  rows={2}
                  value={formValues.producer?.bio || ''}
                  onChange={(e) => handleProducerChange('bio', e.target.value)}
                  variant="outlined"
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
                  {(formValues?.producer?.ProducerImages || []).map((image, i) => (
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

          <Grid item xs={12} >
            <Button variant="outlined" color="error" style={{marginRight:"20px"}} onClick={()=>{navigate("/")}}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Update Movie
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UpdateMovie;
