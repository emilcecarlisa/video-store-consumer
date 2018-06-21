import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Customers extends Component {
  static propTypes = {
    updateStatusCallback: PropTypes.func.isRequired
  };

  constructor() {
    super();

    this.state = {
      moviesCheckedOut: 0
    };
  }

  componentDidMount (){
      this.props.updateStatusCallback('Loading customers...', 'success');
  }

  onClickCustomer = ((event) => {
    this.props.selectedCustomerCallback(event.target.value);
  });

  movieSelected = (event) => {
    console.log(`before reset state`, parseInt(this.state.moviesCheckedOut))

    // this.setState({moviesCheckedOut: this.state.moviesCheckedOut + 1});

    console.log('after reset state', `${this.state.moviesCheckedOut}`)
  }

  render() {
    let numMovies = this.props.moviesCheckedOut ;
    return (
    <div>
      {this.props.customers.map((customer, index)=>{

      return <div key={index}>
      <h1 key={customer.id}>{customer.name}</h1>
      <p>{numMovies} movies checked out</p>
      <button key={index}
      onClick={() => {
        this.onClickCustomer(customer)
      }}>
      Select for Rental
      </button>
      </div>
      })
      }
    </div>);
  }
}


export default Customers;
