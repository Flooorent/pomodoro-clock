import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.addFCCTester()
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
      </div>
    );
  }
}

export default App;
