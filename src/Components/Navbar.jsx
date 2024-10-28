import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom";
import logo from "../assets/logo.png";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  
  const navigate = useNavigate();
  const [search, setSearch] = useState(" ");
  const User = localStorage.getItem("usertoken")



  
  const handlelogoclick = () => {
    navigate("/")
}

const handleLogout = async () => {
  try {
      const response = await axios.post(`${apiurl}/Logout`, {}, {
          withCredentials: true,
      });

      console.log(response);

      if (response.data.success) { 
          toast.success(response.data.message);
          localStorage.removeItem('login');
          localStorage.removeItem('usertoken');
          dispatch(setUserDetails(null));
          navigate("/"); 
      }
  } catch (err) {
      toast.error("An error occurred during logout");
  }
};




  return (
   <header className='h-20 shadow-md bg-white w-full py-3'>
       <div className='container mx-auto flex items-center px-10 pb-4 h-full justify-between'>
                <div className='flex items-center' style={{ marginTop: "10px" }}>
                    <img src={logo} alt="Logo" className="h-20 w-20" onClick={handleLogout} />
                </div>
                <div className='hidden lg:flex items-center w-full justify-between max-w-sm focus-within:shadow-lg '>
                    <TextField label="search here....." className='w-full outline-none' onChange={()=>{
                      console.log("searching");
                      
                    }} value={search} />
                    <div className='w-13 min-w-[50px] h-14 bg-blue-500  flex items-center justify-center rounded-l-sm' >
                        <SearchIcon className='text-white cursor-pointer' />
                    </div>

                </div>
                <div className='flex items-center gap-7'>
                <div>
                        {
                            User? (
                                <button onClick={handleLogout}>Logout</button>

                            )
                              : (
                                    <button className='bg-slate-400 p-2 rounded-sm'><Link to={"/Login"} className='px-3 py-1 rounded-full'>Login</Link></button>
                                )
                        }

                    </div>
                </div>


                </div>
         
    


   </header>
  )
}

export default Navbar