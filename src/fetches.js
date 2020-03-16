const baseURL = "http://localhost:4000/";

// to be called from Form.jsx; endpoint will be "login" || "users", and userObj will be created from the Form.jsx state
export const logInOrCreateUser = (endpoint, userObj) => {
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