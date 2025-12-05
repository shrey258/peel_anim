import './App.css'
import { useState, useRef } from 'react'

function App() {
  const [peelProgress, setPeelProgress] = useState(0)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Calculate diagonal progress from top-left (0,0) to bottom-right (width, height)
    // Use the average of x and y progress for smooth diagonal movement
    const xProgress = Math.max(0, Math.min(100, (x / rect.width) * 100))
    const yProgress = Math.max(0, Math.min(100, (y / rect.height) * 100))
    
    // Average both to get diagonal peel effect
    const diagonalProgress = (xProgress + yProgress) / 2
    
    setPeelProgress(diagonalProgress)
  }

  const handleMouseLeave = () => {
    setPeelProgress(0)
  }

  return (
    <div className="App">
      <div 
        className="card"
        ref={cardRef}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseMove}
      >
        <div 
          className="card-overlay"
          style={{
            clipPath: `inset(${peelProgress}% 0 0 ${peelProgress}%)`,
            transition: 'clip-path 0.5s ease-in-out',
          }}
        />
        <h1>Peel Animation</h1>
      </div>
    </div>
  )
}

export default App
