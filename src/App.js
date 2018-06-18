import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
      <Route path ="/" render={() => (
        <h1>Welcome to your local Video Store</h1>
      )} />
    </div>
    </Router>
    );
  }
}

export default App;
