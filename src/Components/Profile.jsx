import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Profile = props => {

  // REDUX
  const user = useSelector( state => state.user )

  
  // RENDER
  return (
    <div>
      <h1>Profile</h1>
      <p>Hello, {user.username}.</p>
    </div>
  )

}

export default withRouter(Profile);