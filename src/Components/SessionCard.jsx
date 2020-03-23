import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { deleteMeditationSession } from '../fetches'
import NoteModal from './NoteModal';


const SessionCard = props => {

  // STATE
  const [showModal, setShowModal] = useState(false)

  const { session } = props
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
  const returnDurationString = () => {
    const hours = Math.floor(session.duration / 3600)
    const minutes = Math.floor(session.duration / 60)
    const seconds = session.duration % 60

    if (hours > 0) {
      return <p><strong>{hours}</strong> <em>{hours === 1 ? "hour" : "hours"}</em>, <strong>{minutes}</strong> <em>{minutes === 1 ? "minute" : "minutes"}</em>, <strong>{seconds}</strong> <em>{seconds === 1 ? "second" : "seconds"}</em></p>
    }
    if (hours < 1 && minutes > 0) {
      return <p><strong>{minutes}</strong> <em>{minutes === 1 ? "minute" : "minutes"}</em>, <strong>{seconds}</strong> <em>{seconds === 1 ? "second" : "seconds"}</em></p>
    }
    if (hours < 1 && minutes < 1) {
      return <p><strong>{seconds}</strong> <em>{seconds === 1 ? "second" : "seconds"}</em></p>
    }
  }


  // deletes a session from the database and local store
  const handleDelete = () => {
    deleteMeditationSession(sessionId)
    dispatch({
      type: "DELETE_MEDITATION_SESSION",
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

  // RENDER
  return (
    <div className="session-card" onClick={handleClick}>
      <NoteModal 
        show={showModal}
        onHide={() => setShowModal(false)}
        note={session.note}
      />
      {/* <h4>date / time:</h4> */}
      <h4>{dateString}</h4>
      {/* <h5>duration:</h5> */}
      {returnDurationString()}
      <h5>note:</h5>
      <p><em>{session.note ? shortNote : "n/a"}</em>{session.note.length > 19 ? "..." : null}</p>
      {session.note.length > 19 ? <p className="click-card-p">(click card to see full note)</p> : null }
      <span onClick={e => e.stopPropagation()}><button className="delete-btn" onClick={handleDelete}>delete</button></span>
    </div>
  )

}

export default SessionCard;