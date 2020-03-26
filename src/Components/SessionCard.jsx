import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { deleteMeditationSession, deleteFocusSession } from '../fetches'
import NoteModal from './NoteModal';


const SessionCard = props => {

  // STATE
  const [showModal, setShowModal] = useState(false)

  const { session, context } = props
  const sessionId = session.id


  // REDUX
  const dispatch = useDispatch()




  // 
  const options = { 
    weekday: 'short',
    month: 'long', 
    day: 'numeric', 
    year: 'numeric', 
    hour: 'numeric',
    minute: 'numeric', 
  };

  const date = new Date(session.start_time)
  const dateString = date.toLocaleDateString("en-US", options)


  //
  const returnDurationString = durationToConvert => {
    const hours = Math.floor(durationToConvert / 3600)
    const minutes = Math.floor(durationToConvert / 60)
    const seconds = durationToConvert % 60

    if (hours > 0 && (minutes - (hours * 60)) > 0) {
      return <p><strong>{hours}</strong> <em>{hours === 1 ? "hour" : "hours"}</em>, <strong>{minutes - (hours * 60)}</strong> <em>{minutes === 1 ? "minute" : "minutes"}</em></p>
    }
    if (hours > 0 && (minutes - (hours * 60)) === 0) {
      return <p><strong>{hours}</strong> <em>{hours === 1 ? "hour" : "hours"}</em></p>
    }
    if (hours < 1 && minutes > 0) {
      return <p><strong>{minutes}</strong> <em>{minutes === 1 ? "minute" : "minutes"}</em></p>
    }
    if (hours < 1 && minutes < 1) {
      return <p><strong>{seconds}</strong> <em>{seconds === 1 ? "second" : "seconds"}</em></p>
    }
  }




  // deletes a Meditation Session from the database and local store
  const handleDeleteMeditation = () => {
    deleteMeditationSession(sessionId)
    dispatch({
      type: "DELETE_MEDITATION_SESSION",
      payload: sessionId
    })
  }

   // deletes a Focus Session from the database and local store
  const handleDeleteFocus = () => {
    deleteFocusSession(sessionId)
    dispatch({
      type: "DELETE_FOCUS_SESSION",
      payload: sessionId
    })
  }




  // handles a click on the card, showing a div with the full note
  const handleClick = () => {
    if (session.note.length > 19) {
      setShowModal(!showModal)
    }
  }




  // shortened version of the note to display before click, so each card is even
  const shortNote = session.note.slice(0, 20)




  // calculates amount of time worked/relaxed during a Focus Session
  const calculateChunkTime = (sessionChunks) => {
    let chunkArr = sessionChunks.split(" ")
    let chunkArrMin = chunkArr.filter( chunk => chunk !== "" )
    let chunkNums = chunkArrMin.map( chunk => parseInt(chunk) )
    let chunkDuration = chunkNums.reduce((a,b) => a + b, 0)
    return returnDurationString(chunkDuration)
  }




  // conditionally renders the session card based on context (MEDITATION or FOCUS)
  const renderSessionCard = () => {

    if (context === "meditation") {

        return (

          <>
            <NoteModal 
              show={showModal}
              onHide={() => setShowModal(false)}
              note={session.note}
            />
            <h4>{dateString}</h4>
            <h5><u>duration:</u></h5>
            {returnDurationString(session.duration)}
            <h5><u>note:</u></h5>
            <p><em>{session.note ? shortNote : "n/a"}</em>{session.note.length > 19 ? "..." : null}</p>
            {session.note.length > 19 ? <p className="click-card-p">(click card to see full note)</p> : null }
            <span onClick={e => e.stopPropagation()}><button className="delete-btn" onClick={handleDeleteMeditation}>delete</button></span>
          </>

        )

    } else if (context === "focus") {

        return (

          <>
            <NoteModal 
              show={showModal}
              onHide={() => setShowModal(false)}
              note={session.note}
            />
            <h4>{dateString}</h4>
            <h5><u>duration:</u></h5>
            {returnDurationString(session.duration)}
            <h5><u>total time worked:</u></h5>
            {calculateChunkTime(session.work_chunks)}
            <h5><u>note:</u></h5>
            <p><em>{session.note ? shortNote : "n/a"}</em>{session.note.length > 19 ? "..." : null}</p>
            {session.note.length > 19 ? <p className="click-card-p">(click card to see full note)</p> : null }
            <span onClick={e => e.stopPropagation()}><button className="delete-btn" onClick={handleDeleteFocus}>delete</button></span>
          </>

        )

    }

  }




  // RENDER
  return (
    <div className="session-card" onClick={handleClick}>
      {renderSessionCard()}
    </div>
  )

}

export default SessionCard;


















// scratch code that might be needed again
// , <strong>{seconds}</strong> <em>{seconds === 1 ? "second" : "seconds"}</em>