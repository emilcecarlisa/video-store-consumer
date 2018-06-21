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


// GET /movies/:title
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
<<<<<<< HEAD
      status:{
        message:'loaded the page',
        type:'success'
      }
=======
      moviesCheckedOut: 0
>>>>>>> 2d49aa25d33fc856f2a596fa5c1745c33aa0de3e
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
      const data = response.data.slice(0, 100)
      this.setState({movies: data})
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

    console.log('in checkOutRental', checkoutObj)
    axios.post(CHECKOUT_URL+`/${title}/check-out`, checkoutObj)
    .then((response) => {
      console.log('things happening',response)

      const updatedCustomers = this.state.customers;
      let foundCustomer = updatedCustomers.find(c => c.id === this.state.selectedCustomer.id);

      console.log(foundCustomer);

      this.setState({moviesCheckedOut: foundCustomer.moviesCheckedOut += 1})

      console.log(`${this.state.moviesCheckedOut}`);
    })
  };

  componentDidMount(){
    axios.get(CUSTOMER_URL)
    .then((response) => {
      this.setState({customers: response.data,
        status: {
          message: 'This',
          type: 'blah',
        },

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




    return (
      <Router>
      <div>
      <Link to='/'>Home</Link><br />
      <Link to='/customers'>Customers</Link><br />
      <Link to='/library'>Movie Library</Link>
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
      <Route exact={true} path ="/" render={() => (
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
            <Link to='/'>Home</Link><br />
            <Link to='/customers'>Customers</Link><br />
            <Link to='/library'>Movie Library</Link>
            <section>
              <div>
                Selected Customer:
                {this.state.selectedCustomer.name}
              </div>
              <div>
                Selected Movie: {this.state.selectedMovie}
              </div>
              <div>
                <button onClick={this.checkOutNewRental} movieCountCallback={this.getMovieCount} > Checkout New Rental</button>
              </div>
            </section>
            <Status
    message={this.state.status.message}
    type={this.state.status.type}
    />
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
