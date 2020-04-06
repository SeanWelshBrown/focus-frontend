import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';

const FocusModal = props => {

  
  // STATE
  const [focusForm, setFocusForm] = useState({ focusType: "", note: "" })
  
  
  const { focusType, note } = focusForm
  const { user, context, save, ...rest } = props
 




    // handler to control the input and textarea forms
  const setFormValue = e => {
    setFocusForm({
      ...focusForm,
      [e.target.name]: e.target.value
    })
  }




  // handles initial Focus Session save on button click
  const initialSaveBtnClick = () => {
    save(focusForm)
    setFocusForm({ focusType: "", note: "" })
  }




  const conditionalModalRender = () => {

    if (user.id > 0) {

      if (context === "auto save") {

        return (
          <Modal
            {...rest}
            className="modal focus"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            {/* <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                <em>Focus Session complete</em> <span role="img" aria-label="bicep">💪</span>
              </Modal.Title>
            </Modal.Header> */}
            <Modal.Body>

              <h4>You've completed a full Focus Session!</h4>

              <p>You can continue working and extend this session (and save it later.)</p>
              <p>Or, you can save this finished session to your account with some additional info:</p>

              <label className="modal-label" htmlFor="focusType">Focus type (optional):</label>
              <br />
              <input 
                type="text"
                name="focusType"
                value={focusType}
                placeholder="work, study, etc..."
                onChange={e => setFormValue(e)}
              />
              <br />

              <label className="modal-label" htmlFor="note">Note (optional):</label>
              <br />
              <textarea
                rows="5"
                cols="35"
                name="note"
                value={note}
                placeholder="How did this session go?"
                onChange={e => setFormValue(e)}
              />

            </Modal.Body>
            <Modal.Footer>
              <button onClick={props.onHide}>Close and Continue</button>
              <button onClick={initialSaveBtnClick}>Save and Reset</button>
            </Modal.Footer>
          </Modal>
        );

      } else if (context === "manual save") {

        return (
          <Modal
            {...rest}
            className="modal focus"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            {/* <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                <em>meditation complete</em> <span role="img" aria-label="praying">🙏</span>
              </Modal.Title>
            </Modal.Header> */}
            <Modal.Body>

              <h4>Save and finish this Focus Session early?</h4>

              <p>You can continue working on this session until it is completed (after <strong>4</strong> work sessions.)</p>
              <p>Or, you may end early and save this session to your account with some additional info:</p>

              <label className="modal-label" htmlFor="focusType">Focus type (optional):</label>
              <br />
              <input 
                type="text"
                name="focusType"
                value={focusType}
                placeholder="work, study, etc..."
                onChange={e => setFormValue(e)}
              />
              <br />

              <label className="modal-label" htmlFor="note">Note (optional):</label>
              <br />
              <textarea
                rows="5"
                cols="35"
                name="note"
                value={note}
                placeholder="How did this session go?"
                onChange={e => setFormValue(e)}
              />

            </Modal.Body>
            <Modal.Footer>
              <button onClick={props.onHide}>Close and Continue</button>
              <button onClick={initialSaveBtnClick}>Save and Reset</button>
            </Modal.Footer>
          </Modal>
        );

      }

    } else {

      return (
        <Modal
          {...rest}
          className="modal focus"
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          {/* <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              <em>meditation complete</em> <span role="img" aria-label="praying">🙏</span>
            </Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            <h4>You've completed a full Focus Session!</h4>
            <p>(Log in to save sessions to your account, or continue working and stay focused.)</p>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={props.onHide}>Close and Continue</button>
          </Modal.Footer>
        </Modal>
      );

    }
  }

  return (
    <div>
      {conditionalModalRender()}
    </div>
  )

}

export default FocusModal;