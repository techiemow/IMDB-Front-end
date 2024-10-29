import React from 'react'
import { Fab } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import DisplayProducer from './DisplayProducer';

const ProducerHome = () => {
  const navigate = useNavigate();

  const handleOpen = () => {
    navigate("/AddNewProducer");
  };
  return (
    <div>
    <DisplayProducer/>
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

export default ProducerHome