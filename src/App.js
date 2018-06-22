
import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Movie from './components/Movie';
import Customers from './components/Customers';
import Library from './components/Library';
import AddMovie from './components/AddMovie';
import Status from './components/Status';

const MOVIE_URL = 'http://localhost:3000/movies?query=';
const LIBRARY_URL =
'http://localhost:3000/movies';
const CUSTOMER_URL =
'http://localhost:3000/customers';
const CHECKOUT_URL =
'http://localhost:3000/rentals';
class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      customers:[],
      libraryMovies: [],
      selectedCustomer: '',
      selectedMovie:'',
      status:{
        message:'loaded the page',
        type:'success'
      },
    };
  }
  updateStatus = (message, type) => {
    this.setState({
      status: {
        message: message,
        type: type
      }
    });
  }
  getMovies = (movie) => {
    axios.get(MOVIE_URL+`${movie.moviename}`)
    .then((response)=> {
      console.log('RESPONSE:', response);
      const data = response.data.slice(0, 100)
      this.setState({
        movies: data })

  })
}
onClickMovie = (movieInfo) => {
  return (event) => {
    event.preventDefault()
    axios.post(LIBRARY_URL, movieInfo)
    .then((response) => {
    })
  };
}
setSelectedCustomer =(customer) => {
  console.log('selectedcustomer', customer)
  this.setState(
    {selectedCustomer: customer}
  )
}
setSelectedMovie =(movie) => {
  console.log('selectedmovie', movie)
  this.setState(
    {selectedMovie: movie}
  )
}


checkOutNewRental = (event) => {
  var due_date = new Date();
  var numberofDaysToAdd = 3;
  due_date.setDate(due_date.getDate() + numberofDaysToAdd);
  let title = this.state.selectedMovie;
  let checkoutObj ={
    movie_id: this.state.selectedMovie,
    customer_id: this.state.selectedCustomer.id,
    due_date: due_date
  }
  axios.post(CHECKOUT_URL+`/${title}/check-out`, checkoutObj)
  .then((response) => {
    const updatedCustomers = this.state.customers;
    let foundCustomer = updatedCustomers.find(c => c.id === this.state.selectedCustomer.id);
    // this.setState({movieCount movies_checked_out_count += 1}
  })
};

homeState = () => {
  this.setState({
    status: {
      message: '',
      type: 'success',
       },})
}


componentDidMount = () => {
  axios.get(CUSTOMER_URL)
  .then((response) => {
    this.setState({customers: response.data,
    });
  })
  .catch((error) =>{
    this.setState({error: error.message});
  });
  axios.get(LIBRARY_URL)
  .then((response) => {
    this.setState({libraryMovies: response.data
    })
  })
  .catch((error) =>{
    this.setState({error: error.message});
  });
}
render(){
  const attrResults = this.state.movies
  const searchResults = attrResults.map((movieInfo, index) => {
    return <div className="item-container" key={ index }>
      <img src={movieInfo.image_url} alt="movie image"/>
      <div className="item-details">
        <h2>{movieInfo.title}</h2>
        <p>{movieInfo.release_date}</p>
      </div>
      <button onClick={this.onClickMovie(movieInfo)}>Add to Rental Library</button>
    </div>
  })
  return (
    <Router>
      <div className="video-store">
        <header className="header">
          <div className="header-controls">
            <div className="nav-bar">
              <nav className="nav-bar-nav">
                <Link to='/' onClick={this.homeState}>Home</Link><br />
                <Link to='/customers'>Customers</Link><br />
                <Link to='/library'>Movie Library</Link>
              </nav>
            </div>
            <section>
              <div>
                Selected Customer:
                {this.state.selectedCustomer.name}
              </div>
              <div>
                Selected Movie: {this.state.selectedMovie}
              </div>
              <div>
                <button onClick={this.checkOutNewRental}> Checkout New Rental</button>
              </div>
            </section>
            <div>
            </div>
            <Status
              message={this.state.status.message}
              type={this.state.status.type}
            />
          </div>
        </header>
        <Route exact={true} path ="/" render={() => (
          <div className="library-container">
            <h1>Welcome to your local Video Store
            </h1>
            <Movie getMoviesCallback={this.getMovies}/>
            <ul className="item-list">
              {searchResults}
            </ul>
          </div>
        )} />
        <Route path="/library" render={() => (
          <div>
            <h1>Library</h1>
            <Library libraryMovies={this.state.libraryMovies} selectedMovieCallback= {this.setSelectedMovie} updateStatusCallback={this.updateStatus}/>
          </div>
        )} />
        <Route path="/customers" render={() => (
          <div>
            <h1> Customers</h1>
            <Customers customers={this.state.customers}
              selectedCustomerCallback= {this.setSelectedCustomer} updateStatusCallback={this.updateStatus} />
            </div>
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
