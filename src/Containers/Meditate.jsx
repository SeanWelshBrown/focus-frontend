import React, { useState } from 'react';

const Meditate = props => {

  // STATE
  const [timer, setTimer] = useState({ hours: 0, minutes: 10, seconds: 0 })
  const { hours, minutes, seconds } = timer


  // Handler to increment/decrement timer based on button clicks
  const handleBtnClick = e => {
    if (e.target.textContent === "-") {
      setTimer({ ...timer, minutes: timer.minutes - 1 })
    } else if (e.target.textContent === "+") {
      setTimer({ ...timer, minutes: timer.minutes + 1 })
    }
  }

  const handleStartBtnClick = () => {
    
  }

  // RENDER
  return (
    <div>

      <h1 className="meditation-timer">
        { hours > 0 ? `${hours}:` : "" }{ minutes }:{ seconds < 10 ? `0${seconds}` : seconds }
      </h1>

      <div className="timer-btn-container">
        <button className="timer-btn" onClick={handleBtnClick}>-</button>
        <button className="timer-btn" onClick={handleBtnClick}>+</button>
        <br />
        <button className="timer-btn" onClick={handleStartBtnClick}>Start</button>
      </div>

    </div>
  )

}

export default Meditate;