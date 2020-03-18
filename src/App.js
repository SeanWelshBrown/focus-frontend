import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { useDispatch } from 'react-redux';

import { persistUser } from './fetches'

import NavBar from './Components/NavBar';
import HomePage from './Containers/HomePage'
import Form from './Components/Form';
import Profile from './Components/Profile';
import Focus from './Containers/Focus';
import FocusSessions from './Containers/FocusSessions'
import Meditate from './Containers/Meditate';
import MeditationSessions from './Containers/MeditationSessions';
import About from './Static/About'
import NotFound from './Static/NotFound';
import Footer from './Static/Footer'


const App = (props) => {

  // REDUX
  const dispatch = useDispatch()

  // initial component mount
  useEffect( () => {
    if (localStorage.getItem("token")) {
      persistUser()
      .then( userData => {
        if (userData.user) {
          dispatch({
            type: "SET_USER",
            payload: userData
          })
        } else {
          localStorage.clear()
        }
      })
    }
  })
  
  // conditionally renders Login/Register form depending on which NavBar link is clicked
  const renderForm = () => {
    if (props.history.location.pathname === "/login") {
      return <Form formName="Login Form" />
    } else if (props.history.location.pathname === "/register") {
      return <Form formName="Register Form" />
    }
  }


  // RENDER
  return (
    <div className="App">

      <div className="main-wrapper">

        <h1 className="header">FOCUS</h1>

        <div className="content-container">

          <div className="nav-div">
            <NavBar />
          </div>
          <div className="content-div">
            <Route render={({ location }) => (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  timeout={400}
                  classNames='fade'
                >

                    <Switch location={ location }>

                      <Route path="/" exact render={() => <HomePage />} />

                      <Route path="/meditate" exact render={() => <Meditate />} />
                      <Route path="/meditation_sessions" render={() => <MeditationSessions />} />

                      <Route path="/focus" exact render={() => <Focus />} />
                      <Route path="/focus_sessions" render={() => <FocusSessions />} />

                      <Route path="/about" render={() => <About />} />

                      <Route path="/login" render={ renderForm } />
                      <Route path="/register" render={ renderForm } />
                      <Route path="/profile" render={() => <Profile />} />

                      <Route path="*" render={() => <NotFound />} />
                      
                    </Switch>

                </CSSTransition>
              </TransitionGroup>
            )}/>
          </div>

        </div>

        <Footer />

      </div>

    </div>
  );
}

export default withRouter(App);
