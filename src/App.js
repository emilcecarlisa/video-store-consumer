import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Search from './components/Search'

class App extends Component {
  render() {
    const custId = ({ match }) => (
      <div>
      <Route path ={match.url + '/:id'} render={() => (
        <h1>Customer #11111</h1>
      )} />
      </div>
    )

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
      <Route path ="/search" render={() => (
        <h1>Search Movies</h1>
      )} />
      <Route path ="/library" render={() => (
        <h1>Library</h1>
      )} />
      <Route path ="/customers" render={() => (
        <h1>Customers</h1>
      )} />

      {custId}
    </div>
    </Router>
    );
  }
}

export default App;
