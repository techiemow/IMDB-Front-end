import React from 'react'
import PopularActors from './PopularActors'
import { Fab } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import DisplayActors from './DisplayActors';

const ActorsHome = () => {
    const navigate = useNavigate();

    const handleOpen = () => {
      navigate("/AddNewActor")
    };
  
  return (
    <div>
        <DisplayActors />
        <PopularActors />
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
  )
}

export default ActorsHome