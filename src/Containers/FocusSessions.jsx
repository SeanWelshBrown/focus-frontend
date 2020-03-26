import React from 'react';
import { useSelector } from 'react-redux';
import SessionCard from '../Components/SessionCard';

const FocusSessions = props => {

  const sessions = useSelector( state => state.focusSessions )


  const renderSessionCards = () => sessions.map( session => <SessionCard key={session.id} context="focus" session={session} /> )

  return (
    <div className="sessions-container">
      {renderSessionCards()}
    </div>
  )

}

export default FocusSessions;