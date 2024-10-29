import React, { useState, useEffect, useContext } from 'react';
import { Button, TextField, Container, Typography, Grid, Stack } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiurl } from '../../../Constants/Apiurl';
import { toast } from 'react-toastify';
import IMDBContext from '../../../Context/Context';

const UpdateActor = () => {
  const { id } = useParams(); // Get actor ID from URL parameters
  const navigate = useNavigate();
  const {fetchActors} = useContext(IMDBContext)
  // State for actor data
  const [actorData, setActorData] = useState({
    name: '',
    gender: '',
    dob: '',
    bio: '',
    ActorImages: [],
  });

  // Fetch actor data when the component mounts
  useEffect(() => {
    axios.get(`${apiurl}/actor/${id}`)
      .then((response) => {
        setActorData(response.data); // Populate form with existing data
      })
      .catch((error) => console.error('Error fetching actor data:', error));
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setActorData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Actor data before update:', actorData); // Log data before submit

    try {
        const response = await axios.put(`${apiurl}/UpdateActor/${id}`, actorData ,{withCredentials: true});
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
              SelectProps={{ native: true }}
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
              name="dob"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={actorData.dob ? actorData.dob.split('T')[0] : ''} // Format date
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bio"
              name="bio"
              fullWidth
              multiline
              rows={4}
              value={actorData.bio}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" type="submit"> Update Actor</Button>
            <Button variant="outlined" color="error" onClick={()=>{navigate("/ActorsHome")}}>Cancel</Button>
          </Stack>
          
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UpdateActor;

