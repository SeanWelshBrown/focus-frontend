import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const NavBar = props => {

  // REDUX
  const dispatch = useDispatch();
  const user = useSelector( state => state.user )
  
  // CONSTANTS
  let currentPage = props.history.location.pathname


  // sends an action to clear the current user and token from state when "Log out" is selected from the NavBar
  const handleLogOut = () => {
    dispatch({
      type: "CLEAR_USER",
    })
    localStorage.clear()
  }

  // conditionally renders either login/register links or a profile page and log out link based off of a user being logged in or not
  const conditionalRenderForLogin = () => {
    if (user.id === 0) {
      return (
        <>
          <li>
            <NavLink to="/login" className={currentPage + "-li"}>Login</NavLink>
          </li>
          <li>
            <NavLink to="/register" className={currentPage + "-li"}>Register</NavLink>
          </li>
        </>
      )
    } else {
      return (
        <>
          <li>
            <NavLink to="/profile" className={currentPage + "-li"}>Profile</NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={handleLogOut}>Log out</NavLink>
          </li>
        </>
      )
    }
  }

  // conditionally renders an extra link under meditate/focus options in navbar based on if the user is currently clicked onto either of those pages
  const conditionalRenderForMeditate = () => {

    if (currentPage === "/meditate" || currentPage === "/meditation_sessions") {
      return (
        <>
          <li className="sessions-li">
            <NavLink to="/meditation_sessions" className={currentPage + "-li"}>→ Meditation Sessions</NavLink>
          </li>
        </>
      )
    } else {
      return null
    }
  }
  const conditionalRenderForFocus = () => {

    if (currentPage === "/focus" || currentPage === "/focus_sessions") {
      return (
        <>
          <li className="sessions-li">
            <NavLink to="/focus_sessions" className={currentPage + "-li"}>→ Focus Sessions</NavLink>
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
        <NavLink to="/" exact className={currentPage + "-li"}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/meditate" className={currentPage + "-li"}>Meditate</NavLink>
      </li>
        {conditionalRenderForMeditate()}
      <li>
        <NavLink to="/focus" className={currentPage + "-li"}>Focus</NavLink>
      </li>
        {conditionalRenderForFocus()}
      <li>
        <NavLink to="/about" className={currentPage + "-li"}>About</NavLink>
      </li>
      {conditionalRenderForLogin()}
    </ul>
  )
}

export default withRouter(NavBar)