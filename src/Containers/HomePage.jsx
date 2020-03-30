import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';

import { getQuoteOfTheDay } from '../fetches';

const HomePage = props => {

  const [quoteOfTheDay, setQuoteOfTheDay] = useState("")

  useEffect( () => {

    // assigns Quote of the Day to localStorage with expiry (the midnight following the quote being set)
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



  return (
    <div>

      <h1 className="home-time"><Moment format="h:mm A" interval={1000}/></h1>
      <h3 className="home-date"><Moment format="dddd, MMMM Do YYYY" interval={60000}/></h3>

      <h2 className="home-weather">58° Partly Cloudy</h2>
      
      <h6>Quote of the Day:</h6>
      <p className="home-quote">{!!quoteOfTheDay ? quoteOfTheDay.contents.quotes[0].quote : null }</p>
      <p className="home-quote">{!!quoteOfTheDay ? `- ${quoteOfTheDay.contents.quotes[0].author}` : null }</p>
    </div>
  )

}

export default HomePage;