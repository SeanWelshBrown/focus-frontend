import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';

const NoteModal = props => {

  // STATE




  // RENDER
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Note:
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.note}</p>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  );

}

export default NoteModal;