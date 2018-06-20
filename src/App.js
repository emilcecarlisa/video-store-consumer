import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Movie from './components/Movie';
import Customers from './components/Customers';
import Library from './components/Library';
import AddMovie from './components/AddMovie';

// GET /movies/:title
const MOVIE_URL = 'http://localhost:3000/movies?query=';

const LIBRARY_URL =
'http://localhost:3000/movies';

const CUSTOMER_URL =
'http://localhost:3000/customers';



class App extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      customers:[],
    };
  }

  getMovies = (movie) => {
    console.log(movie);
    axios.get(MOVIE_URL+`${movie.moviename}`)
    .then((response)=> {
      console.log('THIS IS response', response);
      console.log('THIS IS RESPONSE',response.data.results);

      const data = response.data.slice(0, 100)
      this.setState({movies: data})
    })
  }


  onClickMovie = (movieInfo) => {
    console.log(movieInfo, 'movieInfo in click')
    return (event) => {
      event.preventDefault()
      console.log(movieInfo, 'movieInfo in click')
      axios.post(LIBRARY_URL, movieInfo)
      .then((response) => {
        console.log('sent a request to library to create')
      })
    };
  }

  componentDidMount(){
    axios.get(CUSTOMER_URL)
    .then((response) => {
      console.log(response,'response here')
      this.setState({customers: response.data})
    });
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

        <button onClick={this.onClickMovie(movieInfo)}>Add to Rental Library</button>
      </div>
    })

    return (
      <Router>
        <div>
          <Link to='/customers'>Customers          </Link>
          <Link to='/'>Home          </Link>
          <Link to='/movie'>Movie        </Link>
          <Route exact={true} path ="/" render={() => (
            <div>
              <h1>Welcome to your local Video Store</h1>
              <Movie getMoviesCallback={this.getMovies}/>
              {searchResults}
            </div>
          )} />

          <Route path="/movie" render={() => (
            <h1>Search Movies</h1>
          )} />

          <Route path="/library" render={() => (
            <div>
              <h1>Library</h1>
              <Library/>
            </div>
          )} />

          <Route path="/customers" render={() => (
            <div>
              <h1> Customers</h1>
              <Customers customers={this.state.customers} />
            </div>
          )} />





        </div>
      </Router>
    );
  }
}

export default App;
