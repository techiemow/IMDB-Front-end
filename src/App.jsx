// App.js
import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      {/* Other components can go here */}
    </>
  );
}

export default App;
