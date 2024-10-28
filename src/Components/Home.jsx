import React, { useState } from 'react';

import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import Popularmovies from './Popularmovies';
import DisplayMovies from './DisplayMovies';

const Home = () => {

  const navigate = useNavigate();

  const handleOpen = () => {
    navigate("/AddMovie")
  };

 

  return (
    <div>
      <DisplayMovies />
      <Popularmovies />
      <Fab 
        color="primary" 
        aria-label="add" 
        onClick={handleOpen}
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
      <Add />
      </Fab>

 
    </div>
  );
};

export default Home;
