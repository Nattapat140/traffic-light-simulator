import { useState, useEffect } from "react";

export default function TrafficLight({trafficStates}){
    const [currentColor, setCurrentColor] = useState("green")

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

    return(
        <>
        <div className="traffic-light-container">
            {Object.keys(trafficStates).map((color) => (
                <div 
                className="traffic-light-circle" 
                key = {color}
                style = {{
                    backgroundColor:
                        color === currentColor ?
                        trafficStates[color].backgroundColor : "grey"
                }}
                />
            ))}
        </div>
        </>
    );
}