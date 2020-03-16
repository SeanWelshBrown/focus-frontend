import React from 'react';
import { useState } from 'react';
import { logInOrCreateUser } from '../fetches'
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';


const Form = props => {

  // REDUX
  const dispatch = useDispatch();

  // STATE
  const [form, setForm] = useState({ username: "", password: "", profilePic: ""})


  // changes text value of form submit button conditionally
  const submitBtnValue = () => {
    if (props.formName === "Login Form") {
      return "Log In"
    } else {
      return "Create Account"
    }
  }

  // controls form through state
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  // handles submitting form conditionally by dispatching either a Login action or an account registration action
  function handleInitialSubmit(e) {
    e.preventDefault()
    let endpoint;
    let userObj = {
      username: form.username,
      password: form.password
    }

    if (props.formName === "Login Form") {
      endpoint = "login"
    } else {
      endpoint = "users"
      userObj = {
        ...userObj,
        profile_pic: form.profilePic
      }
    }
    
    logInOrCreateUser(endpoint, userObj)
    .then( userData => {
      if (userData.user && userData.token) {
        localStorage.token = userData.token;
        dispatch({
          type: "SET_USER",
          payload: userData
        })
        props.history.push("/")
      } else {
        alert(userData.error)
      }
    })
  }


  // RENDER
  return (
    <div>

      <form className="login-register-form" onSubmit={handleInitialSubmit}>

        <h1>{props.formName}</h1>

        <label htmlFor="username">Username: </label>
        <input 
          type="text" 
          autoComplete="off"
          name="username" 
          value={form.username}
          placeholder="Required"
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input 
          type="password" 
          autoComplete="off"
          name="password" 
          value={form.password}
          placeholder="Required"
          onChange={handleChange}
        />
        <br />
        { props.formName === "Register Form" &&
          <>
            <label htmlFor="profilePic">Profile Picture: </label>
            <input 
              type="text" 
              autoComplete="off"
              name="profilePic" 
              value={form.profilePic}
              placeholder="Optional"
              onChange={handleChange}
            />
            <br />
          </>
        }
        <input type="submit" value={submitBtnValue()} /> 

      </form>

    </div>
  )

}

export default withRouter(Form);