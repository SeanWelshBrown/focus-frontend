import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const NavBar = props => {

  // conditionally renders either login/register links or a profile page and log out link based off of a user being logged in or not
  const conditionalRenderForLogin = () => {
    if (props.user.id === 0) {
      return (
        <>
          <li>
          <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </>
      )
    } else {
      return (
        <>
          <li>
          <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/logout">Log out</NavLink>
          </li>
        </>
      )
    }
  }

  // conditionally renders an extra link under meditate/focus options in navbar based on if the user is currently clicked onto either of those pages
  const conditionalRenderForMeditate = () => {
    let currentPage = props.history.location.pathname

    if (currentPage === "/meditate" || currentPage === "/meditate/sessions") {
      return (
        <>
          <li className="sessions-link">
            <NavLink to="/meditate/sessions">Sessions</NavLink>
          </li>
        </>
      )
    } else {
      return null
    }
  }
  const conditionalRenderForFocus = () => {
    let currentPage = props.history.location.pathname

    if (currentPage === "/focus" || currentPage === "/focus/sessions") {
      return (
        <>
          <li className="sessions-link">
            <NavLink to="/focus/sessions">Sessions</NavLink>
          </li>
        </>
      )
    } else {
      return null
    }
  }


  // RENDER
  return (
    <ul className="nav">
      <li>
        <NavLink to="/" exact>Home</NavLink>
      </li>
      <li>
        <NavLink to="/meditate">Meditate</NavLink>
      </li>
        {conditionalRenderForMeditate()}
      <li>
        <NavLink to="/focus">Focus</NavLink>
      </li>
        {conditionalRenderForFocus()}
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      {conditionalRenderForLogin()}
    </ul>
  )
}


// REDUX
const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(NavBar))