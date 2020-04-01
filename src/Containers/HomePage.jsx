import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';

import { getWeather, getQuoteOfTheDay } from '../fetches';
import { usePosition } from 'use-position';

const HomePage = props => {

  // STATE
  const [quoteOfTheDay, setQuoteOfTheDay] = useState("")
  const [weather, setWeather] = useState("")

  // gathers and tracks current browser geolocation for use in weather fetch
  const { latitude, longitude, error } = usePosition({enableHighAccuracy: true});




  // runs on component mount and checks localStorage to see if a quote exists.
    // If a quote does not exist, it fetches and sets a new Quote of the Day to localStorage along with an expiry value (the midnight following when it was set) and renders the quote in state.
    // If a quote exists, its expiry time is run against the current time, either clearing it and fetching a new one if it has expired or rendering the current one if it hasn't.
  useEffect( () => {

      const assignQuoteToLocalStorage = () => {
        getQuoteOfTheDay()
        .then( quote => {
          
          const currentTime = new Date()
          const expiry = currentTime.getTime() + (secondsToMidnight(currentTime) * 1000)
          
          localStorage.quote = JSON.stringify(quote)
          localStorage.expiry = expiry

          setQuoteOfTheDay(quote)
          
        })
      }

    if (!!localStorage.quote) {

      let quoteExpiry = parseInt(localStorage.getItem("expiry"))
      let now = new Date()

      if (now.getTime() > quoteExpiry) {

        localStorage.removeItem("quote")
        localStorage.removeItem("expiry")

        assignQuoteToLocalStorage()

      } else {

        let quote = JSON.parse(localStorage.getItem("quote"))
        setQuoteOfTheDay(quote)
        
      }

    } else {

      assignQuoteToLocalStorage()

    }

  }, [])

  // finds the amount of seconds until midnight from a time passed in; time passed in (n) must be in Date() format
  const secondsToMidnight = (n) => {
    return (
      ((24 - n.getHours() - 1) * 60 * 60) + ((60 - n.getMinutes() - 1) * 60) + (60 - n.getSeconds())
    )
  }




  // runs when the latitude or longitude values change, using the values (if truthy) from the usePosition() hook to fetch weather data and set it to state for rendering.
    // an interval is also set to check and update the weather every 5 minutes.
  useEffect( () => {

    let isMounted = true;

    const getAndSetWeather = () => {
      getWeather(latitude, longitude)
      .then( weather => {
        if (isMounted) {
          setWeather(weather)
        }
      })
    }
    
    let interval;
    if (!!latitude) {
      getAndSetWeather()
      interval = setInterval(getAndSetWeather, (5 * 60 * 1000))
    }

    return function cleanup() {
      isMounted = false
      clearInterval(interval);
    }

  }, [latitude, longitude])


  
  // renders conditional geolocation message to User
  const renderGeolocationMsg = () => {
    if (!!error) {

      return <h5 className="home-weather-disabled">{error === "User denied Geolocation" ? "enable location services to display current weather" : null}</h5>

    } else {

      return <h5 className="home-weather-disabled">{!!weather ? null : "fetching geolocation for weather; one moment" }</h5>

    }
  }





  return (
    <div className="home-container">

      <h1 className="home-time"><Moment format="h:mm A" interval={1000}/></h1>
      <h3 className="home-date"><Moment format="dddd, MMMM Do YYYY" interval={60000}/></h3>

      <h2 className="home-weather">{!!weather ? `${Math.round(weather.temperature)}° ${weather.summary}`  :  null }</h2>
      {renderGeolocationMsg()}
      
      <h5 className="home-quote-header">Quote of the Day:</h5>
      <p className="home-quote quote">{!!quoteOfTheDay ? quoteOfTheDay.contents.quotes[0].quote : null }</p>
      <p className="home-quote author">{!!quoteOfTheDay ? `- ${quoteOfTheDay.contents.quotes[0].author}` : null }</p>
      
    </div>
  )

}

export default HomePage;