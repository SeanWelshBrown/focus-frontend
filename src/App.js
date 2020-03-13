import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';

import NavBar from './Components/NavBar';
import HomePage from './Containers/HomePage'
import Form from './Components/Form';
import Profile from './Components/Profile';
import Focus from './Containers/Focus';
import FocusSessions from './Containers/FocusSessions'
import Meditate from './Containers/Meditate';
import MeditationSessions from './Containers/MeditationSessions';
import NotFound from './Static/NotFound';

// END imports


const App = (props) => {
  
  // conditionally renders Login/Register form
  const renderForm = () => {
    if (props.history.location.pathname === "/login") {
      return <Form formName="Login Form" handleSubmit={ handleLoginSubmit } />
    } else if (props.history.location.pathname === "/register") {
      return <Form formName="Register Form" handleSubmit={ handleRegisterSubmit } />
    }
  }

  const handleLoginSubmit = () => {
    
  }
  const handleRegisterSubmit = () => {

  }
  


  // RENDER
  return (
    <div className="App">
      <div className="main-container">
        <div className="nav-container">
          <NavBar />
        </div>
        <div className="main-content">

          <Switch>

            <Route path="/" exact render={ HomePage } />

            <Route path="/meditate" exact render={ Meditate } />
            <Route path="/meditate/sessions" render={ MeditationSessions } />

            <Route path="/focus" exact render={ Focus } />
            <Route path="/focus/sessions" render={ FocusSessions } />

            <Route path="/login" render={ renderForm } />
            <Route path="/register" render={ renderForm } />
            <Route path="/profile" render={ Profile } />

            <Route path="*" render={ NotFound } />
            
          </Switch>

        </div>
      </div>
    </div>
  );
}

export default withRouter(App);
