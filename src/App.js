import React from 'react';
import './App.css';
import LengthPicker from './LengthPicker'



class App extends React.Component {
  constructor(props) {
    super(props)

    this.defaultBreakLength = 5
    this.defaultSessionLength = 25
    this.minLength = 1
    this.maxLength = 60

    this.state = {
      lengths: {
        break: this.defaultBreakLength,
        session: this.defaultSessionLength
      },
      timeLeft: this.defaultSessionLength,
      currentTimer: 'Session',
      isRunning: false
    }

    this.handleReset = this.handleReset.bind(this)
    this.handleDecrementClick = this.handleDecrementClick.bind(this)
    this.handleIncrementClick = this.handleIncrementClick.bind(this)
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
      timeLeft: this.defaultSessionLength,
      currentTimer: 'Session',
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
          newState.timeLeft = newBreakOrSessionLength
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
          newState.timeLeft = newBreakOrSessionLength
        }

        this.setState(newState)
      }
    }
  }

  render() {
    const formattedTimeLeft = this.state.timeLeft.toString().padStart(2, '0') + ':00'

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
            <div id="time-left">{formattedTimeLeft}</div>
          </div>

          <div id="controls">
            <div id="start_stop"></div>
            <button id="reset" type="button" onClick={this.handleReset}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
