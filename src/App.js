import React from 'react';
import './App.css';
import LengthPicker from './LengthPicker'



class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.fontAwesomeLink = document.createElement('link')
    this.fontAwesomeLink.rel = 'stylesheet'
    this.fontAwesomeLink.href = 'https://use.fontawesome.com/releases/v5.8.2/css/all.css'
    this.fontAwesomeLink.integrity = 'sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay'
    this.fontAwesomeLink.crossOrigin = 'anonymous'

    document.body.appendChild(this.fontAwesomeLink)
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

  render() {
    return (
      <div className="App">
        <div id="pomodoro-container">
          <header>Pomodoro Clock</header>
          <div id="lengths-picker-container">
            <LengthPicker
              name="Break Length"
              label="break"
            />
            <LengthPicker
              name="Session Length"
              label="session"
            />
          </div>
          <div id="session"></div>
          <div id="controls"></div>
        </div>
      </div>
    );
  }
}

export default App;
