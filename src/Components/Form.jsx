import React from 'react';
import { useState } from 'react';

const Form = props => {

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

  // handles submitting form conditionally with either a log-in or an account registration passed down from parent
  const handleInitialSubmit = (e) => {
    e.preventDefault()
    let endpoint;
    if (props.formName === "Login Form") {
      endpoint = "login"
    } else {
      endpoint = "users"
    }
    
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
          type="text" 
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

export default Form;