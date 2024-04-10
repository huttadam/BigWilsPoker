import React, {useState, useEffect} from 'react'
import './Timer.css'
import './Blinds.jsx'
import Blinds from './Blinds.jsx'
 
 const Timer = () => {
    const [time , setTime] = useState(0)
    const [timerRunning, setTimerRunning] = useState(false)
    const [currentLevel, setCurrentLevel] = useState(0)
    const [showDropdown, setShowDropdown] = useState(false)

    const [winner, setWinner] = useState("")
    const [runnerUp, setRunnerUp] = useState("")
    const [firstOut, setFirstOut] = useState("")
    const [secondOut, setSecondOut] = useState("")
    const [isDone, setDone] = useState("")

    const blinds = [
        {level: 0, name: "100 / 200", small: 100, big: 200},
        {level: 1, name: "200 / 400", small: 200, big: 400},
        {level: 2, name: "300 / 600", small: 300, big: 600},
        {level: 3, name: "400 / 800", small: 400, big: 800},
        {level: 4, name: "500 / 1000", small: 500, big: 1000},
        {level: 5, name: "1000 / 2000", small: 1000, big: 2000},
        {level: 6, name: "2000 / 4000", small: 2000, big: 4000},
        {level: 7, name: "3000 / 6000", small: 3000, big: 6000},
        {level: 8, name: "4000 / 8000", small: 4000, big: 8000},
        {level: 9, name: "5000 / 10000", small: 5000, big: 10000},
        {level: 10, name: "10000 / 20000", small: 10000, big: 20000},
        {level: 11, name: "15000 / 30000", small: 15000, big: 30000},
        {level: 12, name: "20000 / 40000", small: 20000, big: 40000},
        {level: 13, name: "30000 / 60000", small: 30000, big: 60000},
        {level: 14, name: "60000 / 120000", small: 60000, big: 120000},
        {level: 15, name: "120000 / 240000", small: 120000, big: 240000}, 
    ]


    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);


    useEffect(() =>{
        let intervalId;
        if(timerRunning) {
            intervalId = setInterval(() => setTime(prevTime => prevTime + 1),10)
        }
        return () => clearInterval(intervalId)
    }, [timerRunning, time]
    )

    useEffect(() =>{
        if(minutes >= 1){
            if(currentLevel < blinds.length - 1){
                setCurrentLevel(prevLevel => prevLevel + 1)
            }
            setTime(0)
        }   
    })

    const startAndStop = () => {
        setTimerRunning(!timerRunning)
    }

    const reset = () => {
        setTime(0)
    }

    const handleChangeBlinds = () => {
        setShowDropdown(!showDropdown)
        setTimerRunning(timerRunning)
    }


    return (
        <>
          <div className='page-cont'>
            <div className='timer-function-container'>
                <div className='blinds-header'>Blinds</div>
                <Blinds allBlinds={blinds} curLev={currentLevel} />
                <div className='timer-cont'>
                <p className='timers-time'>
                    {minutes.toString().padStart(2,"0")}:
                    {seconds.toString().padStart(2,"0")}
                </p>
                <div className="timer-buttons">
                    <button className="timer-button" onClick={startAndStop}>
                    {timerRunning ? "Stop" : "Start"}
                    </button>
                    <button className='timer-button' onClick={reset}>Reset</button>
                    <button className='timer-button' onClick={handleChangeBlinds}>
                    Change Blinds
                    </button>
                </div>
                {showDropdown && (
                    <select onChange={e => setCurrentLevel(parseInt(e.target.value))}>
                    {blinds.map((lev, index) => (
                        <option key={index} value={lev.level}>
                        Level {lev.level + 1}: {lev.name}
                        </option>
                    ))}
                    </select>
                )}
                </div>
            </div>
            <div className='chip-container'>
                <div className='chip'> <img src="./src/assets/100.png" alt="100 chip" /></div>
                <div className='chip'> <img src="./src/assets/500.png" alt="500 chip" /></div>
                <div className='chip'> <img src="./src/assets/1000.png" alt="1000 chip" /></div>
                <div className='chip'> <img src="./src/assets/5000.png" alt="5000 chip" /></div>
                <div className='chip'> <img src="./src/assets/25000.png" alt="25000 chip" /></div>
            </div>
          </div>
        </>
      )
 }
 
 export default Timer