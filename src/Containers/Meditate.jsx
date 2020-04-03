import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Prompt } from 'react-router-dom';

import MeditateModal from '../Components/MeditateModal';
import HowToModal from '../Components/HowToModal';

import { updateUserTimeMeditated, postMeditationSession } from '../fetches';

import alarm_zen from './alarm_zen.mp3'



const Meditate = props => {

  // STATE/GLOBALS
  const [timer, setTimer] = useState({ hours: 0, minutes: 0, seconds: 2 })
  const [timerCopy, setTimerCopy] = useState({})

  const [isCounting, setIsCounting] = useState(false)
  const [timerIsActive, setTimerIsActive] = useState(false)
  
  const [timerInfo, setTimerInfo] = useState({ duration: 0, startTime: "" })
  const [meditationSession, setMeditationSession] = useState({ start_time: "", end_time: "", duration: 0 })

  const [showModal, setShowModal] = useState(false)
  const [showHowToModal, setShowHowToModal] = useState(false)
  
  
  const { hours, minutes, seconds } = timer

  // REDUX
  const user = useSelector( state => state.user )

  // AUDIO
  const meditate_alarm = new Audio(alarm_zen)
  meditate_alarm.loop = true




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

    if (isCounting === false && timerIsActive === false) {
      
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const startTime = date+' '+time;
      
      let timerInSeconds = (timer.hours * 3600) + (timer.minutes * 60) + timer.seconds
      
      setTimerInfo({ duration: timerInSeconds, startTime: startTime })
      setTimerCopy(timer)
      
      setIsCounting(!isCounting)
      setTimerIsActive(!timerIsActive)
      
    } else if (isCounting === false && timerIsActive === true) {

      setIsCounting(!isCounting)

    } else if (isCounting === true) {

      setIsCounting(!isCounting)

    }
  }




  // resets timer and all component states back to initial form when start button was clicked
  const handleResetBtnClick = () => {
    if (isCounting) {
      setIsCounting(!isCounting)
    }
    if (timerIsActive) {
      setTimerIsActive(!timerIsActive)
      setTimer(timerCopy)
    }
  }




  // timer decrementing function set to an interveral on "start"
  const countDownTimer = () => {

    if (seconds > 0) {
      setTimer({ ...timer, seconds: seconds - 1 })
    }

    if (seconds === 0) {
      if (hours === 0 && minutes === 0) {
        timerIsFinished()
      } else if (hours > 0 && minutes === 0) {
        setTimer({ ...timer, hours: hours - 1, minutes: 59, seconds: 59 })
      } else {
        setTimer({ ...timer, minutes: minutes - 1, seconds: 59 })
      }
    }
  }




  // actions to take place when a timer is allowed to run its course all the way to zero
  const timerIsFinished = () => {

    setIsCounting(!isCounting)
    setTimerIsActive(!timerIsActive)
    setTimer(timerCopy)

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const endTime = date+' '+time;

    setMeditationSession({
      start_time: timerInfo.startTime,
      end_time: endTime,
      duration: timerInfo.duration,
    })

    setShowModal(!showModal)

    if (user.id > 0) {
      updateUserTimeMeditated(user.id, timerInfo.duration)
    }

    setTimerInfo({ ...timerInfo, duration: 0, startTime: "" })

    playAlarm()

  }

  // plays alarm sound and renders alert() until user clicks OK
  const playAlarm = () => {

    meditate_alarm.play()
    alert("Meditation Session complete. \n \n Click OK to end the alarm and continue.")
    meditate_alarm.pause()
    meditate_alarm.currentTime = 0

  }




  // sent down as a prop to the modal when a session finishes, to be called when the "save" button is hit. Fires off a fetch to the back-end to save the session to the currently logged-in user
  const saveMeditationSession = (note) => {

    const token = localStorage.getItem("token")
    const meditationSessionObj = {
      ...meditationSession,
      note: note
    }
    postMeditationSession(meditationSessionObj, token)

  }




  // conditional text for start/continue button
  const startBtnText = () => {
    if (timerIsActive) {
      return "Resume ►"
    } else {
      return "Start ►"
    }
  }




  // message to be displayed by prompt when attempting to leave page while session is active
  const promptMessage = "You are currently in the middle of a meditation session. \n\nIf you leave the current page, this session will be lost unless saved. \n \nClick 'Cancel' to resume your current session, or 'OK' to leave the page and reset progress."




    // sets How To Modal show state to true on click
    const handleHowToClick = () => {

      setShowHowToModal(true)

    }





  // RENDER
  return (
    <div className="meditate-container">

      <Prompt 
        when={timerIsActive}
        message={promptMessage}
      />
      
      <HowToModal 
        show={showHowToModal}
        onHide={() => setShowHowToModal(false)}
        context="meditation"
      />

      <MeditateModal
        show={showModal}
        onHide={() => setShowModal(false)}
        user={user}
        saveMeditationSession={saveMeditationSession}
      />

      <h2 className="meditate-header">⤢ <em>m e d i t a t e</em> ⤡</h2>

      <p className="meditate-timer-msg">( set a timer for your session and let your mind begin to settle <span role="img" aria-label="praying">🍃</span> )</p>

      <p className="how-to-link meditate" onClick={handleHowToClick}>(How do I do this?)</p>

      <h1 className="meditation-timer">
        { hours > 0 ? `${hours}:` : "" }{ hours > 0 && minutes < 10 ? `0${minutes}` : minutes }:{ seconds < 10 ? `0${seconds}` : seconds }
      </h1>

      <div className="timer-btn-container">
        <button className={timerIsActive ? "timer-btn inactive" : "timer-btn"} onClick={handleBtnClick}>-</button>
        <button className={timerIsActive ? "timer-btn inactive" : "timer-btn"} onClick={handleBtnClick}>+</button>
        <br />
        <button className="timer-btn start" onClick={handleStartBtnClick}>{isCounting ? "Pause ❚❚" : startBtnText() }</button>
        <br />
        <button className={timerIsActive ? "timer-btn reset fadeIn" : "timer-btn reset fadeOut"} onClick={handleResetBtnClick}>Reset</button>
      </div>

    </div>
  )

}

export default Meditate;