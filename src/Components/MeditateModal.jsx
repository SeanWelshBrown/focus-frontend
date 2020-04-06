import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';

const MeditateModal = props => {

  // STATE
  const [note, setNote] = useState("")

  const { saveMeditationSession, user, ...rest } = props

  // initial function called on "save" button click, sends off note from state up to parent
  const initialSaveClick = () => {
    saveMeditationSession(note)
    props.onHide()
    setNote("")
  }


  // renders the modal based off of whether a currently logged-in user exists, maintaining two separate functionalities in the application
  const conditionalModalRender = () => {
    if (user.id > 0) {
      return (
        <Modal
          {...rest}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              <em>meditation complete</em> <span role="img" aria-label="praying">🙏</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Save this session?</h3>
            <p>(add an optional note on your experience below, click save, or click away to embrace impermanence.)</p>
            <textarea
              rows="6"
              cols="40"
              value={note}
              placeholder="~Check in with yourself~"
              onChange={e => setNote(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <button onClick={props.onHide}>Close</button>
            <button onClick={initialSaveClick}>Save</button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return (
        <Modal
          {...rest}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              <em>meditation complete</em> <span role="img" aria-label="praying">🙏</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>(Log in to save this session, or click away to embrace impermanence.)</p>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={props.onHide}>Close</button>
          </Modal.Footer>
        </Modal>
      );
    }
  }


  // RENDER
  return (
    <div>
      {conditionalModalRender()}
    </div>
  );

}

export default MeditateModal;