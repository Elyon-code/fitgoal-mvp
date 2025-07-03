import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button";


function App() {
  return (
    <div
      className="text-white flex items-center justify-center text-2xl"
      style={{ height: '100vh', width: '100vw', backgroundColor: '#6b21a8' }} // custom purple
    >
      Tailwind is working!
      <Button variant="default">Click me</Button>
    </div>
  );
}

export default App;
