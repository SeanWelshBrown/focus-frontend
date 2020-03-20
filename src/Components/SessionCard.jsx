import React from 'react';

const SessionCard = props => {

  const { session } = props

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


  // RENDER
  return (
    <div className="session-card">
      {/* <h4>date / time:</h4> */}
      <h4>{dateString}</h4>
      {/* <h5>duration:</h5> */}
      {returnDurationString()}
      <h5>note:</h5>
      <p>{session.note}</p>
    </div>
  )

}

export default SessionCard;