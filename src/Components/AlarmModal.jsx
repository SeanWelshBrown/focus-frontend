import React from 'react';

import Modal from 'react-bootstrap/Modal';

const AlarmModal = props => {


  // RENDER
  return (
    <Modal
      {...props}
      className="modal alarm"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Session complete!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <h3>Session complete!</h3> */}
        <h3>Click to end the alarm and continue.</h3>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>End Alarm</button>
      </Modal.Footer>
    </Modal>
  );

}

export default AlarmModal;