import { useState, useEffect } from 'react'
import './App.css'
import TrafficLight from "./TrafficLight"
import Cars from "./Cars"

function App() {
  const [currentColor, setCurrentColor] = useState("green");
  const [cars, setCars] = useState([])
  const [carCount, setCarCount] = useState(0)

      useEffect(() => {
          const { duration, next } = trafficStates[currentColor]
  
          const timerID = setTimeout(() => {
              setCurrentColor(next)
          }, duration)
  
          return () => {
              clearTimeout(timerID)
          }
      }, [currentColor]) //This effect runs only when currentColor changes because of the dependency array.
      // The dependency array ensures the effect is re-executed whenever currentColor changes but avoids unnecessary runs otherwise.

  const trafficStates = {
    red: {
      duration: 4000,
      backgroundColor: "red",
      next: "green"
    },
    yellow: {
      duration: 1000,
      backgroundColor: "yellow",
      next: "red"
    },
    green: {
      duration: 3000,
      backgroundColor: "green",
      next: "yellow"
    }
  }

  const addCar = () => {
    if (currentColor === "green"){
      setCars([...cars, carCount])
      setCarCount(carCount + 1)
    }
  }

  console.log({currentColor})

  return (
    <>
    <div className='wrapper'>
      <TrafficLight
          trafficStates={trafficStates}
          currentColor={currentColor}
          setCurrentColor={setCurrentColor} // Pass the setter function
      />
    </div>
    <div className='Road'>
      {cars.map((car, index) => (
        <div
          key={car}
          className='Cars'
          style={{
            animation: `drive 5s linear`,
            animationPlayState: currentColor === "red" ? "paused" : "running"
          }}
        >
        <Cars />
        </div>
      ))}

    </div>
    <button className='car-button' onClick={addCar} disabled={(currentColor === "red") || (currentColor === "yellow")}>
      CAR
    </button>
    </>
  )
}

export default App

