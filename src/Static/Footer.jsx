import React from 'react';
import github_mark from './github_mark.png'
import twitter_mark from './twitter_mark.png'
import medium_mark from './medium_mark.png'

const Footer = () => {

  return (
    <div className="footer">
      <p>Developed by Sean Welsh Brown [Access Labs // Brooklyn, 2020]</p>
      <a href="https://github.com/SeanWelshBrown" target="_blank"><img src={github_mark} alt="GitHub logo" /></a>
      <a href="https://twitter.com/SeanWelshBrown" target="_blank"><img src={twitter_mark} alt="Twitter logo" /></a>
      <a href="https://medium.com/@seanwelshbrown" target="_blank"><img src={medium_mark} alt="Medium logo" /></a>
    </div>
  )

}

export default Footer;