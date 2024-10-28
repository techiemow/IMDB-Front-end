// App.js
import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
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
