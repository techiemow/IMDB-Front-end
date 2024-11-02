import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from "../assets/logo.png";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify';
import { apiurl } from '../../Constants/Apiurl';
import { Button, Grid } from '@mui/material';
import IMDBContext from '../../Context/Context';

const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const User = localStorage.getItem('usertoken');
  const{fetchMovies,
    fetchActors,
    fetchProducers} = useContext(IMDBContext)

  const handleLogoClick = () => {
    navigate('/');
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

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  useEffect(() =>{
    fetchMovies();
    fetchActors();
    fetchProducers();
  } , [])

  return (
    <>
<header className="h-20 shadow-md  w-full gap-y-10 py-4 bg-orange-200">
  <div className="container mx-auto flex items-center px-10 pb-4 h-full justify-between">
    <div className="flex items-center" style={{ marginTop: '10px' }}>
      <img src={logo} alt="Logo" className="h-20 w-20 cursor-pointer" onClick={handleLogoClick} />
    </div>
    <div className="hidden lg:flex items-center w-full justify-between max-w-sm focus-within:shadow-lg">
      <TextField
        label="Search here..."
        className="w-full outline-none"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        variant="outlined" // Added variant for a better look
      />
      <div className="w-13 min-w-[50px] h-14 bg-blue-500 flex items-center justify-center rounded-l-sm cursor-pointer transition-transform duration-200 hover:scale-105" onClick={handleSearch}>
        <SearchIcon className="text-white" />
      </div>
    </div>
    <div className="flex items-center gap-7">
      {User ? (
        <button className="bg-red-500 text-white p-2 rounded-md transition-colors duration-200 hover:bg-red-600" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <button className="bg-slate-400 p-2 rounded-md transition-colors duration-200 hover:bg-slate-500">
          <Link to="/Login" className="text-white px-3 py-1 rounded-full">
            Login
          </Link>
        </button>
      )}
    </div>
  </div>
</header>

<Grid container justifyContent={"center"} columnSpacing={3} spacing={2} style={{marginBottom:"12px", marginTop:"6px"}}>
  <Grid item>
    <Button variant="text" onClick={() => {     fetchMovies();
    fetchActors();
    fetchProducers(); navigate("/") }} className="hover:bg-gray-200 transition-colors duration-200 rounded-md p-2">
      Movies
    </Button>
  </Grid>
  <Grid item>
    <Button variant="text" onClick={() => {    fetchMovies();
    fetchActors();
    fetchProducers(); navigate("/ActorsHome") }} className="hover:bg-gray-200 transition-colors duration-200 rounded-md p-2">
      Actors
    </Button>
  </Grid>
  <Grid item>
    <Button variant="text" onClick={() => {     fetchMovies();
    fetchActors();
    fetchProducers();
    navigate("/ProducersHome") }} className="hover:bg-gray-200 transition-colors duration-200 rounded-md p-2">
      Producers
    </Button>
  </Grid>
</Grid>

    </>
  );
};

export default Navbar;
