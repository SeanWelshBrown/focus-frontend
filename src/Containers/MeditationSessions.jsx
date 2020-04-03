import React from 'react';
import { useSelector } from 'react-redux';
import SessionCard from '../Components/SessionCard';

const MeditationSessions = props => {

  const sessions = useSelector( state => state.meditationSessions )
  const user = useSelector( state => state.user )



  
  // iterates through sessions from props and renders SessionCard components
  const renderSessionCards = () => sessions.map( session => <SessionCard key={session.id} context="meditation" session={session} /> )

  // checks to see if a user is logged in and if they have any Sessions saved, displaying them if so, and displaying conditional messages if not
  const renderSessionContent = () => {

    if (user.id > 0) {

      if (sessions.length > 0) {
        return renderSessionCards()
      } else {
        return <h2>You have no saved Meditation Sessions.</h2>
      }

    } else {

      return <h2>You must be logged in to view previous sessions.</h2>

    }

}
  



  // RENDER
  return (
    <div className="sessions-container">
      {renderSessionContent()}
    </div>
  )

}

export default MeditationSessions;