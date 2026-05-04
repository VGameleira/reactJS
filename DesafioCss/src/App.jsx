import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import MinhaImage from '../components/MinhaImage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <img src={heroImg} className="image" alt="Hero App" />
      <MinhaImage />
    </>
  )
}

export default App
