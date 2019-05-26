import React from 'react';
import './App.css';
import LengthPicker from './LengthPicker'

const BREAK = 'Break'
const SESSION = 'Session'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.defaultBreakLength = 5
    this.defaultSessionLength = 25
    this.defaultTimeLeft = `${this.defaultSessionLength}:00`
    this.minLength = 1
    this.maxLength = 60

    this.state = {
      lengths: {
        break: this.defaultBreakLength,
        session: this.defaultSessionLength
      },
      timeLeft: this.defaultTimeLeft,
      currentTimer: SESSION,
      isRunning: false
    }

    this.handleReset = this.handleReset.bind(this)
    this.handleDecrementClick = this.handleDecrementClick.bind(this)
    this.handleIncrementClick = this.handleIncrementClick.bind(this)
    this.handleStartStop = this.handleStartStop.bind(this)
  }

  componentDidMount() {
    this.addFCCTester()
  }

  componentWillUnmount() {
    document.body.removeChild(this.fontAwesomeLink)
  }

  addFCCTester() {
    const script = document.createElement('script')
    script.src = 'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js'
    script.async = true
    document.body.appendChild(script)
  }

  handleReset() {
    this.setState({
      lengths: {
        break: this.defaultBreakLength,
        session: this.defaultSessionLength
      },
      timeLeft: this.defaultTimeLeft,
      currentTimer: SESSION,
      isRunning: false
    })
  }

  handleDecrementClick(breakOrSession) {
    if(!this.state.isRunning) {
      const currentLength = this.state.lengths[breakOrSession]
      
      if(currentLength > this.minLength) {
        const newLengths = {...this.state.lengths}
        const newBreakOrSessionLength = currentLength - 1
        newLengths[breakOrSession] = newBreakOrSessionLength

        const newState = {
          lengths: newLengths 
        }

        if(breakOrSession.toLowerCase() === "session") {
          newState.timeLeft = this.formatTimeLeft(newBreakOrSessionLength)
        }

        this.setState(newState)
      }
    }
  }

  handleIncrementClick(breakOrSession) {
    if(!this.state.isRunning) {
      const currentLength = this.state.lengths[breakOrSession]
      
      if(currentLength < this.maxLength) {
        const newLengths = {...this.state.lengths}
        const newBreakOrSessionLength = currentLength + 1
        newLengths[breakOrSession] = newBreakOrSessionLength

        const newState = {
          lengths: newLengths 
        }

        if(breakOrSession.toLowerCase() === "session") {
          newState.timeLeft = this.formatTimeLeft(newBreakOrSessionLength)
        }

        this.setState(newState)
      }
    }
  }

  handleStartStop() {
    if(this.state.isRunning) {
      clearInterval(this.timerID)

      this.setState({
        isRunning: !this.state.isRunning
      })
    } else {
      this.setState({
        isRunning: !this.state.isRunning
      }, () => {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        )
      }) 
    }
  }

  /**
   * Remove one second to timeLeft. Switch timers if timer's minutes went negative.
   */
  tick() {
    let [minutes, seconds] = this.state.timeLeft.split(':').map(e => parseInt(e))

    if(seconds >= 1) {
      seconds = seconds - 1
    } else {
      seconds = 59
      minutes = minutes - 1
    }

    if(minutes === -1) {
      this.changeTimer()
    } else {
      this.setState({
        timeLeft: this.formatTimeLeft(minutes, seconds)
      })
    }
  }

  formatTimeLeft(minutes, seconds) {
    const finalSeconds = seconds ? seconds : 0
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedSeconds = finalSeconds.toString().padStart(2, '0')
    return `${formattedMinutes}:${formattedSeconds}`
  }

  changeTimer() {
    if(this.state.currentTimer === SESSION) {
      this.setState({
        currentTimer: BREAK,
        timeLeft: this.formatTimeLeft(this.state.lengths.break)
      })
    } else {
      this.setState({
        currentTimer: SESSION,
        timeLeft: this.formatTimeLeft(this.state.lengths.session)
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div id="pomodoro-container">

          <header>Pomodoro Clock</header>

          <div id="lengths-picker-container">
            <LengthPicker
              label="break"
              length={this.state.lengths.break}
              handleDecrementClick={() => this.handleDecrementClick("break")}
              handleIncrementClick={() => this.handleIncrementClick("break")}
            />
            <LengthPicker
              label="session"
              length={this.state.lengths.session}
              handleDecrementClick={() => this.handleDecrementClick("session")}
              handleIncrementClick={() => this.handleIncrementClick("session")}
            />
          </div>

          <div id="session">
            <div id="timer-label">{this.state.currentTimer}</div>
            <div id="time-left">{this.state.timeLeft}</div>
          </div>

          <div id="controls">
            <button id="start_stop" type="button" onClick={this.handleStartStop}>Start-Stop</button>
            <button id="reset" type="button" onClick={this.handleReset}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
