import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import EditModal from '../Components/EditModal';

import { updateProfilePic } from '../fetches';

import profile_pic_placeholder from './profile_pic_placeholder.png'

const Profile = props => {

  // STATE
  const [showEdit, setShowEdit] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [userState, setUserState] = useState("")

  // REDUX
  const user = useSelector( state => state.user )
  const { username, profile_pic, time_meditated, time_focused } = user

  useEffect( () => {
    setUserState(user)
  }, [user])




  
  // returns a formatted version of the total time meditated in JSX, converted from raw seconds
  const returnTimeMeditated = () => {
    const hours = Math.floor(time_meditated / 3600)
    const minutes = Math.floor(time_meditated / 60)
    const seconds = time_meditated % 60

    if (hours > 0) {
      return <p><strong>{hours}</strong> <em>{hours === 1 ? "hour" : "hours"}</em>, <strong>{minutes - (hours * 60)}</strong> <em>{minutes === 1 ? "minute" : "minutes"}</em>, <strong>{seconds}</strong> <em>{seconds === 1 ? "second" : "seconds"}</em></p>
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
      return <p><strong>{hours}</strong> <em>{hours === 1 ? "hour" : "hours"}</em>, <strong>{minutes - (hours * 60)}</strong> <em>{minutes === 1 ? "minute" : "minutes"}</em>, <strong>{seconds}</strong> <em>{seconds === 1 ? "second" : "seconds"}</em></p>
    }
    if (hours < 1 && minutes > 0) {
      return <p><strong>{minutes}</strong> <em>{minutes === 1 ? "minute" : "minutes"}</em>, <strong>{seconds}</strong> <em>{seconds === 1 ? "second" : "seconds"}</em></p>
    }
    if (hours < 1 && minutes < 1) {
      return <p><strong>{seconds}</strong> <em>{seconds === 1 ? "second" : "seconds"}</em></p>
    }
  }




  // sends off a PATCH request to the backend, updating a User's saved profile pic URL
  const newProfilePic = url => {
    updateProfilePic(user.id, url)
    setUserState({
      ...userState,
      profile_pic: url
    })
    setShowEditModal(false)
  }




  
  // RENDER
  return (
    <div className="profile-container">

      <EditModal 
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        profilePic={profile_pic}
        update={newProfilePic}
      />

      <div className="profile-content">

        <h1>Hello, {username}</h1>

        <div className="profile-pic-container" onMouseEnter={() => setShowEdit(true)} onMouseLeave={() => setShowEdit(false)}>
          {userState.profile_pic ? <img className="profile-pic" src={userState.profile_pic} alt="profile pic" /> : <img className="profile-pic" src={profile_pic_placeholder} alt="profile pic" />}
          {showEdit ? <p className="edit-profile-pic" onClick={() => setShowEditModal(true)}>edit profile picture</p> : null }
        </div>

        <h3>total time meditated:</h3>
        {returnTimeMeditated()}

        <h3>total time focused:</h3>
        {returnTimeFocused()}

      </div>
    </div>
  )

}

export default Profile;