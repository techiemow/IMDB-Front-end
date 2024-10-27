import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";
import logo from "../assets/logo.png";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {
  
  // const navigate = useNavigate();
  const [search, setSearch] = useState(" ");



  
//   const handlelogoclick = () => {
//     navigate("/")
// }




  return (
   <header className='h-20 shadow-md bg-white w-full'>
       <div className='container mx-auto flex items-center px-10 pb-4 h-full justify-between'>
                <div className='flex items-center' style={{ marginTop: "10px" }}>
                    <img src={logo} alt="Logo" className="h-20 w-20" onClick={()=>{console.log("clicked");
                    }} />
                </div>
                <div className='hidden lg:flex items-center w-full justify-between max-w-sm focus-within:shadow-lg '>
                    <TextField label="search here....." className='w-full outline-none' onChange={()=>{
                      console.log("searching");
                      
                    }} value={search} />
                    <div className='w-13 min-w-[50px] h-14 bg-blue-500  flex items-center justify-center rounded-l-sm' >
                        <SearchIcon className='text-white cursor-pointer' />
                    </div>

                </div>
                </div>
    


   </header>
  )
}

export default Navbar