import React, { useState, useEffect } from 'react';
import { Prompt } from 'react-router-dom'

const Meditate = props => {


  // STATE
  const [timer, setTimer] = useState({ hours: 0, minutes: 10, seconds: 0 })
  const [timerCopy, setTimerCopy] = useState({})
  const [isCounting, setIsCounting] = useState(false)
  const [timerIsActive, setTimerIsActive] = useState(false)
  const [timerInfo, setTimerInfo] = useState({ duration: 0, startTime: "", endTime: "" })
  
  const { hours, minutes, seconds } = timer



  // set interval for clock tick
  useEffect( () => {
    let interval = null;
    if (isCounting) {
      interval = setInterval(countDownTimer, 1000)
    }
    return () => clearInterval(interval)
  })


  // Handler to increment/decrement timer based on button clicks
  const handleBtnClick = e => {

    if (timerIsActive === false) {

      if (e.target.textContent === "-" && timer.hours > 0) {
      
        if (timer.minutes === 0) {
          setTimer({ ...timer, hours: timer.hours - 1, minutes: 59})
        } else {
          setTimer({ ...timer, minutes: timer.minutes -1 })
        }

      } else if (e.target.textContent === "-" && timer.minutes > 1) {

        setTimer({ ...timer, minutes: timer.minutes - 1 })
      
      } else if (e.target.textContent === "+") {

        if (timer.minutes === 59) {
          setTimer({ ...timer, hours: hours + 1, minutes: 0})
        } else {
          setTimer({ ...timer, minutes: timer.minutes + 1 })
        }

      }
    }
  }


  // either starts or pauses the countdown timer conditionally, based off of state
  const handleStartBtnClick = () => {

    if (isCounting === false) {
      
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date+' '+time;
      
      let timerInSeconds = (timer.hours * 3600) + (timer.minutes * 60) + timer.seconds
      
      setTimerInfo({ ...timerInfo, duration: timerInSeconds, startTime: dateTime})
      setTimerCopy(timer)
      
      setIsCounting(!isCounting)

      if (!timerIsActive) {
        setTimerIsActive(!timerIsActive)
      }
      
    } else if (isCounting === true) {

      setIsCounting(!isCounting)

    }
  }


  // resets timer and all component states back to initial form when start button was clicked
  const handleRestartBtnClick = () => {
    if (isCounting) {
      setIsCounting(!isCounting)
    }
    setTimerIsActive(!timerIsActive)
    setTimer(timerCopy)
  }


  // timer decrementing function set to an interveral on "start"
  const countDownTimer = () => {
    if (seconds > 0) {
      setTimer({ ...timer, seconds: seconds - 1 })
    }

    if (seconds === 0) {
      if (hours === 0 && minutes === 0) {
        // clearInterval
      } else if (hours > 0 && minutes === 0) {
        setTimer({ ...timer, hours: hours - 1, minutes: 59, seconds: 59 })
      } else {
        setTimer({ ...timer, minutes: minutes - 1, seconds: 59 })
      }
    }
  }


  // conditional text for start/continue button
  const startBtnText = () => {
    if (timerIsActive) {
      return "Resume ►"
    } else {
      return "Start ►"
    }
  }



  // RENDER
  return (
    <div>

      <Prompt 
        when={timerIsActive}
        message="Timer is currently active, are you sure you want to leave?"
      />
      
      <h1 className="meditation-timer">
        { hours > 0 ? `${hours}:` : "" }{ hours > 0 && minutes < 10 ? `0${minutes}` : minutes }:{ seconds < 10 ? `0${seconds}` : seconds }
      </h1>

      <div className="timer-btn-container">
        <button className={timerIsActive ? "timer-btn inactive" : "timer-btn"} onClick={handleBtnClick}>-</button>
        <button className={timerIsActive ? "timer-btn inactive" : "timer-btn"} onClick={handleBtnClick}>+</button>
        <br />
        <button className="timer-btn start" onClick={handleStartBtnClick}>{isCounting ? "Pause ❚❚" : startBtnText() }</button>
        <br />
        <button className={timerIsActive ? "timer-btn reset fadeIn" : "timer-btn reset fadeOut"} onClick={handleRestartBtnClick}>Reset</button>
      </div>

    </div>
  )

}

export default Meditate;