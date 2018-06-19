import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Movie from './components/Movie';
import Customers from './components/Customers';
import Library from './components/Library';

const MOVIE_URL = 'https://api.themoviedb.org/3/search/movie?api_key=2cd88d6d9ddd51231e2a95f88452a830&';

class App extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
    };
  }

  getMovies = (movie) => {
    console.log(movie);
    axios.get(MOVIE_URL+`&language=en-US&query=${movie}&page=1&include_adult=false`)
    .then((response)=> {
      console.log('THIS IS response', response);
      console.log('THIS IS RESPONSE',response.data.results);

      const data = response.data.results.slice(0, 100)
      this.setState({movies: data})
    })

  }

  render() {
    const custId = ({ match }) => (
      <div>
        <Route path ={match.url + '/:id'} render={() => (
          <h1>Customer #11111</h1>
        )} />
      </div>
    )

    const attrResults = this.state.movies
    console.log('RESULTS', attrResults);
    const searchResults = attrResults.map((movieInfo, index) => {
      console.log(movieInfo);
      return <div>
      <img src={movieInfo.poster_path} alt="movie image"/>
      <p>{movieInfo.title}</p>
      <p>{movieInfo.release_date}</p>
      </div>
    })

    return (
      <Router>
        <div>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>

          </div>
          <Route exact={true} path ="/" render={() => (
            <h1>Welcome to your local Video Store</h1>
          )} />
          <Route path ="/movie" render={() => (
            <h1>Search Movies</h1>
          )} />
          <Route path ="/library" render={() => (
            <h1>Library</h1>
          )} />
          <Route path ="/customers" render={() => (
            <h1> Customers</h1>
          )} />

          {custId}
          <Movie getMoviesCallback={this.getMovies}/>

          {searchResults}
          <Customers />
          <Library/>
        </div>
      </Router>
    );
  }
}

export default App;
