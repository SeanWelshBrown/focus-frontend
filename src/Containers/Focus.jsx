import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Prompt } from 'react-router-dom';

import TallyMarks from '../Components/TallyMarks';
import { updateUserTimeFocused, postFocusSession } from '../fetches'

import FocusModal from '../Components/FocusModal';


const Focus = props => {

  // STATE
  const [timer, setTimer] = useState({ hours: 0, minutes: 25, seconds: 0 })
  const [timerCopy, setTimerCopy] = useState({})
  const [timerInfo, setTimerInfo] = useState({ duration: 0, startTime: "" })
  const [focusSession, setFocusSession] = useState({ start_time: "", end_time: "", duration: 0 })

  const [userWorkTimer, setUserWorkTimer] = useState({ hours: 0, minutes: 25, seconds: 0 })
  const [userBreakTimer, setUserBreakTimer] = useState({ hours: 0, minutes: 5, seconds: 0 })
  const [userBigBreakTimer, setUserBigBreakTimer] = useState({ hours: 0, minutes: 15, seconds: 0 })

  const [workChunks, setWorkChunks] = useState("")
  const [breakChunks, setBreakChunks] = useState("")

  const [workSessionTally, setWorkSessionTally] = useState(0)

  const [isCounting, setIsCounting] = useState(false)
  const [timerIsActive, setTimerIsActive] = useState(false)
  const [isWorking, setIsWorking] = useState(true)
  const [sessionIsActive, setSessionIsActive] = useState(false)

  const [showSaveModal, setShowSaveModal] = useState(false)
  const [modalContext, setModalContext] = useState("")

  
  const { hours, minutes, seconds } = timer
  
  // REDUX
  const user = useSelector( state => state.user )




  // set interval for clock tick
  useEffect( () => {
    let interval = null;
    if (isCounting) {
      interval = setInterval(countDownTimer, 1000)
    }
    return () => (
      clearInterval(interval)
    )
  })




  // Handler to increment/decrement timer based on button clicks
  const handleBtnClick = e => {

    if (timerIsActive === false) {

      if (e.target.textContent === "-" && timer.hours > 0) {
      
        if (timer.minutes === 0) {
          setTimer({ ...timer, hours: timer.hours - 1, minutes: 59})
        } else {
          setTimer({ ...timer, minutes: timer.minutes - 1 })
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

      if (sessionIsActive === false) {
        setSessionIsActive(true)
      }
      
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
        if (isWorking === true) {
          workTimerIsFinished()
        } else {
          breakTimerIsFinished()
        }
      } else if (hours > 0 && minutes === 0) {
        setTimer({ ...timer, hours: hours - 1, minutes: 59, seconds: 59 })
      } else {
        setTimer({ ...timer, minutes: minutes - 1, seconds: 59 })
      }
    }
  }




  // actions to be carried out when a WORK timer is allowed to run its course
  const workTimerIsFinished = () => {

    setIsCounting(!isCounting)
    setTimerIsActive(!timerIsActive)

      // sets the userWorkTimer to what the user has chosen
    setUserWorkTimer(timerCopy)

      // resets the timer for the coming BREAK session to either the userBreak or userBigBreak value based off of how many tallies there currently are
    if (workSessionTally < 3) {
      setTimer(userBreakTimer)
    } else if (workSessionTally === 3) {
      setTimer(userBigBreakTimer)
    }

      // updates total time focused for current User
    if (user.id > 0) {
      updateUserTimeFocused(user.id, timerInfo.duration)
    }

      // sets or updates the overall focus session's start_time, end_time and total duration
    if (!!workChunks === false) {

      setFocusSession({
        ...focusSession,
        start_time: timerInfo.startTime,
        duration: timerInfo.duration,
      })

    } else if (workSessionTally < 3) {

      setFocusSession({
        ...focusSession,
        duration: focusSession.duration + timerInfo.duration
      })

    } else if (workSessionTally === 3) {

      setFocusSession({
        ...focusSession,
        end_time: returnEndTime(),
        duration: focusSession.duration + timerInfo.duration
      })
      setModalContext("auto save")
      setShowSaveModal(true)
      
    }

      // updates the current focus session's WorkChunks and increments the current tally
    setWorkChunks(workChunks + ` ${timerInfo.duration.toString()}`)
    setWorkSessionTally(workSessionTally + 1)

      // switches to BREAK mode
    setIsWorking(false)

      // resets timerInfo
    setTimerInfo({ duration: 0, startTime: "" })
  }




  // actions to be carried out when a BREAK timer is allowed to run its course
  const breakTimerIsFinished = () => {

    setIsCounting(!isCounting)
    setTimerIsActive(!timerIsActive)

      // sets either the userBreak or userBigBreak values to the current timer's value based off of current tallies
    if (workSessionTally === 4) {
      setUserBigBreakTimer(timerCopy)
    } else {
      setUserBreakTimer(timerCopy)
    }

      // updates the total duration of the Focus Session
    setFocusSession({
      ...focusSession,
      duration: focusSession.duration + timerInfo.duration
    })

      // resets the timer for the next WORK session based off of the userWorkTimer value
    setTimer(userWorkTimer)

      // updates the current focus session's breakChunks
    setBreakChunks(breakChunks + ` ${timerInfo.duration.toString()}`)

    if (workSessionTally === 4) {
      setWorkSessionTally(0)
    }

    setIsWorking(true)

      // resets timerInfo
    setTimerInfo({ duration: 0, startTime: "" })
  }




  // saves a Focus Session to the backend when a User chooses to save, and resets everything back to a default WORK timer
  const saveFocusSession = focusForm => {

    const token = localStorage.getItem("token")
    const focusSessionObj = {
      ...focusSession,
      work_chunks: workChunks,
      break_chunks: breakChunks,
      focus_type: focusForm.focusType,
      notes: focusForm.note
    }
    postFocusSession(focusSessionObj, token)

    setShowSaveModal(false)
    setTimer(userWorkTimer)
    setWorkChunks("")
    setBreakChunks("")
    setModalContext("")
    setWorkSessionTally(0)
    setFocusSession({ start_time: "", end_time: "", duration: 0 })
    setSessionIsActive(false)
    setIsWorking(true)

  }




  // handles clicking the manual save button, displaying a conditional modal for an early save of the current Focus Session
  const handleManualSaveBtn = () => {
    setFocusSession({
      ...focusSession,
      end_time: returnEndTime()
    })
    setShowSaveModal(true)
    setModalContext("manual save")
  }




  // helper function to return the end_time of a Focus Session
  const returnEndTime = () => {
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const endTime = date+' '+time;

    return endTime
  }




  // conditional text for start/continue button
  const startBtnText = () => {
    if (timerIsActive) {
      return "Resume ►"
    } else {
      return "Start ►"
    }
  }

  // conditionally selects className for work/break buttons
  const focusBtnName = () => {
    if (isWorking === true) {
      return "timer-btn focus work"
    } else {
      return "timer-btn focus break"
    }
  }

  // message to be displayed by prompt when attempting to leave page while session is active
  const promptMessage = "You are currently in the middle of a focus session. \n\nIf you leave the current page, this session will be lost unless saved. \n \nClick 'Cancel' to resume your current session, or 'OK' to leave the page and reset progress."

  // renders a message to the user telling them what to do with the timer they're currently set to, to aid UX
  const renderTimerMessage = () => {
    if (isWorking === true) {
      return <p className="focus-timer-msg work">( set a timer for your work session and get fired up <span role="img" aria-label="fire">🔥</span> )</p>
    } else {
      if (workSessionTally < 4) {
        return <p className="focus-timer-msg break">( set a short timer for this break session and chill out <span role="img" aria-label="snowflake">❄️</span> )</p>
      } else if (workSessionTally === 4) {
        return <p className="focus-timer-msg break big">( set a longer timer for your next break, you've earned it <span role="img" aria-label="clapping">👏</span> )</p>
      }
    }
  }




  
  // RENDER
  return (
    <div>

      <Prompt 
        when={sessionIsActive}
        message={promptMessage}
      />

      <FocusModal 
        show={showSaveModal}
        onHide={() => setShowSaveModal(false)}
        context={modalContext}
        user={user}
        save={saveFocusSession}
      />


      {isWorking ? <h2 className="focus-header work">→ <em>f o c u s</em> ←</h2> : <h2 className="focus-header break">← <em>r e l a x</em> →</h2>}

      {renderTimerMessage()}

      <h1 className={isWorking ? "focus-timer work" : "focus-timer break"}>
        { hours > 0 ? `${hours}:` : "" }{ hours > 0 && minutes < 10 ? `0${minutes}` : minutes }:{ seconds < 10 ? `0${seconds}` : seconds }
      </h1>

      <TallyMarks tally={workSessionTally} />

      <div className="timer-btn-container">
        <button className={timerIsActive ? focusBtnName() + " inactive" : focusBtnName()} onClick={handleBtnClick}>-</button>
        <button className={timerIsActive ? focusBtnName() + " inactive" : focusBtnName()} onClick={handleBtnClick}>+</button>
        <br />
        <button className={(focusBtnName() + " start")} onClick={handleStartBtnClick}>{isCounting ? "Pause ❚❚" : startBtnText() }</button>
        <br />
        <button className={timerIsActive ? focusBtnName() + " reset fadeIn" : focusBtnName() + " reset fadeOut"} onClick={handleResetBtnClick}>Reset</button>
        <br />
        <button className={!!workChunks ? focusBtnName() + " reset fadeIn save" : focusBtnName() + " reset fadeOut save"} onClick={handleManualSaveBtn}>Save Session</button>
      </div>
    </div>
  )

}

export default Focus;