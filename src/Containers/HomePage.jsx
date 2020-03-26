import React from 'react';
import Moment from 'react-moment';

const HomePage = props => {




  return (
    <div>
      <h1 className="home-time"><Moment format="h:mm A" interval={1000}/></h1>
      <h3 className="home-date"><Moment format="dddd, MMMM Do YYYY" interval={60000}/></h3>
      <h2 className="home-weather">58° Partly Cloudy</h2>
      <p className="home-quote">This is a placeholder motivational quote, can't you tell?" - Some Wise Person</p>
    </div>
  )

}

export default HomePage;