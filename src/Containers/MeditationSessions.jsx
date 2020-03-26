import React from 'react';
import { useSelector } from 'react-redux';
import SessionCard from '../Components/SessionCard';

const MeditationSessions = props => {

  const sessions = useSelector( state => state.meditationSessions )


  const renderSessionCards = () => sessions.map( session => <SessionCard key={session.id} context="meditation" session={session} /> )

  return (
    <div className="sessions-container">
      {renderSessionCards()}
    </div>
  )

}

export default MeditationSessions;