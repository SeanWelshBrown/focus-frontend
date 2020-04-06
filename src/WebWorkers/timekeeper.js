// this WebWorker takes in messages from the Timer components, and either starts or stops a 1 second interval respectively. This interval sends a message and 'pings' the countDownTimer() function to decrement the timer.

const timekeeperInterval = () => {

  let tick = null; 

  self.addEventListener("message", e => { // eslint-disable-line no-restricted-globals

    if (e.data === "start") {
      if (tick) {
        clearInterval(tick)
      }
      tick = setInterval( () => {
        postMessage('')
      }, 1000);
      
    }

    if (e.data === "stop") {
      clearInterval(tick)
    }

  })
}

export default timekeeperInterval;