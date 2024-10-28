// App.js
import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
    <ToastContainer position="top-center" autoClose={5000} />
      <Navbar />
      {isLoading ? (
      <div className="loading">Loading...</div>
    ) : (
      <main className='min-h-[calc(100vh-120px)] source'>
        <Outlet />
    
      </main>
    )}
    </>
  );
}

export default App;
