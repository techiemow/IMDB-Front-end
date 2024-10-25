import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="text-center text-blue-500 text-2xl font-bold">
      Hello, Tailwind CSS with Vite!
    </div>
    </>
  )
}

export default App
