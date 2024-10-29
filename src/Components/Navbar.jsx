import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../assets/logo.png";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import { apiurl } from '../../Constants/Apiurl';
import { Button, Grid } from '@mui/material';

const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const User = localStorage.getItem('usertoken');

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(`${apiurl}/Search`, { query: search }, {withCredentials: true});

      console.log('Movie saved successfully:', response.data);
    } catch (error) {
      console.error('Error searching and saving movie:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${apiurl}/Logout`, {}, { withCredentials: true });
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.removeItem('login');
        localStorage.removeItem('usertoken');
        navigate('/');
      }
    } catch (err) {
      toast.error("An error occurred during logout");
    }
  };

  return (
    <>
    <header className="h-20 shadow-md bg-white w-full py-3">
      <div className="container mx-auto flex items-center px-10 pb-4 h-full justify-between">
        <div className="flex items-center" style={{ marginTop: '10px' }}>
          <img src={logo} alt="Logo" className="h-20 w-20 cursor-pointer" onClick={handleLogoClick} />
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm focus-within:shadow-lg">
          <TextField
            label="search here....."
            className="w-full outline-none"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="w-13 min-w-[50px] h-14 bg-blue-500 flex items-center justify-center rounded-l-sm" onClick={handleSearch}>
            <SearchIcon className="text-white cursor-pointer" />
          </div>
        </div>
        <div className="flex items-center gap-7">
          {User ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <button className="bg-slate-400 p-2 rounded-sm">
              <Link to="/Login" className="px-3 py-1 rounded-full">
                Login
              </Link>
            </button>
          )}
        </div>
      </div>
    </header>
       <Grid container justifyContent={"center"} columnSpacing={2}>
       <Grid item>
         <Button variant="text" onClick={()=>{navigate("/")}} >Movies</Button>
       </Grid>
       <Grid item>
         <Button variant="text" onClick={()=>{navigate("/ActorsHome")}}>Actors</Button>
       </Grid>
       <Grid item>
         <Button variant="text" onClick={()=>{navigate("/ProducersHome")}}>Producers</Button>
       </Grid>
     </Grid>
     </>
  );
};

export default Navbar;
