const baseURL = "http://localhost:4000/";


  // AUTH FETCHES

// to be called from Form.jsx; endpoint will be "login" || "users", and userObj will be created from the Form.jsx state
export const createOrLogInUser = (endpoint, userObj) => {
  return (
    fetch(`${baseURL}` + endpoint, {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(userObj)
    })
    .then( r => r.json() )
  )
}

// to be called on initial mount of App.js, persisting authentication in the case of an existing log-in token
export const persistUser = () => {
  return (
    fetch(`${baseURL}/persist`, {
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
    .then( r => r.json() )
  )
}



  // MEDITATION FETCHES

// called when a meditation session finishes, to update a User's total time meditated
export const updateUserTimeMeditated = (userId, meditationDuration) => {
  fetch(`${baseURL}users/${userId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      meditation_duration: meditationDuration
    })
  })
}

// called when a user "saves" a completed meditation session, posting that session to the back-end under the logged-in user
export const postMeditationSession = (meditationSessionObj, token) => {
  fetch(`${baseURL}meditation_sessions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": `bearer ${token}`,
    },
    body: JSON.stringify(meditationSessionObj)
  })
}

// deletes a meditation sesion on button click
export const deleteMeditationSession = (id) => {
  fetch(`${baseURL}meditation_sessions/${id}`, {
    method: "DELETE"
  })
}



  // FOCUS FETCHES

// called when a work timer completes on the focus component, updating a User's total time focused
export const updateUserTimeFocused = (userId, focusDuration) => {
  fetch(`${baseURL}users/${userId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      focus_duration: focusDuration
    })
  })
}

// called when a user "saves" a completed meditation session, posting that session to the back-end under the logged-in user
export const postFocusSession = (focusSessionObj, token) => {
  fetch(`${baseURL}focus_sessions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": `bearer ${token}`,
    },
    body: JSON.stringify(focusSessionObj)
  })
}

