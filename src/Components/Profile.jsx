import React from 'react';
import { useSelector } from 'react-redux';

import profile_pic_placeholder from './profile_pic_placeholder.png'

const Profile = props => {

  // REDUX
  const user = useSelector( state => state.user )
  const { username, profile_pic, time_meditated, time_focused } = user

  
  // returns a formatted version of the total time meditated in JSX, converted from raw seconds
  const returnTimeMeditated = () => {
    const hours = Math.floor(time_meditated / 3600)
    const minutes = Math.floor(time_meditated / 60)
    const seconds = time_meditated % 60

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

  // returns a formatted version of the total time meditated in JSX, converted from raw seconds
  const returnTimeFocused = () => {
    const hours = Math.floor(time_focused / 3600)
    const minutes = Math.floor(time_focused / 60)
    const seconds = time_focused % 60

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
    <div className="profile-container">
      <div className="profile-content">
        <h1>Hello, {username}</h1>
        {user.profile_pic ? <img className="profile-pic" src={profile_pic} alt="profile pic" /> : <img className="profile-pic" src={profile_pic_placeholder} alt="profile pic" />}
        <h3>total time meditated:</h3>
        {returnTimeMeditated()}
        <h3>total time focused:</h3>
        {returnTimeFocused()}
      </div>
    </div>
  )

}

export default Profile;