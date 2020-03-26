import React from 'react';
import { useSelector } from 'react-redux';
import SessionCard from '../Components/SessionCard';

const MeditationSessions = props => {

  const sessions = useSelector( state => state.meditationSessions )
  const user = useSelector( state => state.user )




  const renderSessionCards = () => sessions.map( session => <SessionCard key={session.id} context="meditation" session={session} /> )

  


  return (
    <div className="sessions-container">
      {user.id > 0 ? renderSessionCards() : <h2>You must be logged in to view previous sessions.</h2>}
    </div>
  )

}

export default MeditationSessions;