import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';

const EditModal = props => {

  const { profilePic, update, ...rest } = props

  // STATE
  const [profilePicUrl, setProfilePicUrl] = useState("")

  useEffect( () => {
    setProfilePicUrl(profilePic)
  }, [profilePic])

  // sends new URL up to parent on save
  const handleInitialUpdate = () => {
    update(profilePicUrl)
  }



  // RENDER
  return (
    <Modal
      {...rest}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Profile Picture
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <br />
        <label htmlFor="profilePicUrl">Profile Pic URL:</label>
        <br />
        <input 
          type="text" 
          name="profilePicUrl"
          value={profilePicUrl}
          size="40"
          onChange={e => setProfilePicUrl(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>Close</button>
        <button onClick={handleInitialUpdate}>Save</button>
      </Modal.Footer>
    </Modal>
  );

}

export default EditModal;