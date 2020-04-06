import React from 'react';

import Modal from 'react-bootstrap/Modal';

const HowToModal = props => {

  const { context } = props



  // sets modal title conditionalls
  const renderModalTitle = (context) => {

    if (context === "meditation") {
      return "⚘ How to practice Mindfulness Meditation ⚘"
    }
    if (context === "focus") {
      return "⚘ How to focus with the Pomodoro Technique ⚘"
    }

  }



  // renders How To information for Meditation or Focus based off of Modal context
  const renderHowToInfo = (context) => {
    if (context === "meditation") {

      return (
        <>
          <ol className="how-to-ol">

            <li><strong>Sit comfortably.</strong> Find a spot that gives you a stable, solid, comfortable seat.</li>

            <li><strong>Notice what your legs are doing.</strong> If on a cushion, cross your legs comfortably in front of you. If on a chair, rest the bottoms of your feet on the floor.</li>

            <li><strong>Straighten your upper body—</strong>but don’t stiffen. Your spine has natural curvature. Let it be there.</li>

            <li>N<strong>otice what your arms are doing.</strong> Situate your upper arms parallel to your upper body. Rest the palms of your hands on your legs wherever it feels most natural.</li>

            <li><strong>Soften your gaze.</strong> Drop your chin a little and let your gaze fall gently downward. It’s not necessary to close your eyes. You can simply let what appears before your eyes be there without focusing on it.</li>

            <li><strong>Feel your breath.</strong> Bring your attention to the physical sensation of breathing: the air moving through your nose or mouth, the rising and falling of your belly, or your chest.</li>

            <li><strong>Notice when your mind wanders from your breath.</strong> Inevitably, your attention will leave the breath and wander to other places. Don’t worry. There’s no need to block or eliminate thinking. When you notice your mind wandering gently return your attention to the breath.</li>

            <li><strong>Be kind about your wandering mind.</strong> You may find your mind wandering constantly—that’s normal, too. Instead of wrestling with your thoughts, practice observing them without reacting. Just sit and pay attention. As hard as it is to maintain, that’s all there is. Come back to your breath over and over again, without judgment or expectation.</li>
            
            <li><strong>When you’re ready, gently lift your gaze</strong> (if your eyes are closed, open them). Take a moment and notice any sounds in the environment. Notice how your body feels right now. Notice your thoughts and emotions.</li>
            
          </ol>

          <a href="https://www.mindful.org/meditation/mindfulness-getting-started/" target="_blank" rel="noopener noreferrer">(Visit Mindful.org for more information)</a>
        </>
      )

    }

    if (context === "focus") {

      return (
        <>
          <p>The <strong>Pomodoro Technique</strong> is a time management method that uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. A goal of the technique is to reduce the impact of internal and external interruptions on focus and flow.</p>

          <p>There are six steps in the original technique:</p>

          <ol className="how-to-ol">
            <li><strong>Decide on the task</strong> to be done.</li>
            <li><strong>Set the Work timer</strong> (traditionally to 25 minutes).</li>
            <li><strong>Work</strong> on the task.</li>
            <li><strong>End work when the timer rings</strong> and put down a checkmark somewhere (we'll do that for you here in the app).</li>
            <li><strong>If you have fewer than four checkmarks, take a short break</strong> (3–5 minutes), then return to step 2.</li>
            <li><strong>After four Work sessions, take a longer break</strong> (15–30 minutes), reset your checkmarks to zero, then go to step 1.</li>
          </ol>

          <p><strong>NOTE: </strong>In this app you may also finish and save a session early by using the manual "Save Session" button that appears after at least one full work timer is complete.</p>

          <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank" rel="noopener noreferrer">(Visit Wikipedia.org for more information)</a>

        </>

      )

    }
  }




  return (

    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {renderModalTitle(context)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {renderHowToInfo(context)}
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>

  )

}

export default HowToModal;