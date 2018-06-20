import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Customers extends Component {
  constructor() {
    super();

    this.state = {
      moviesCheckedOut: 0
    };
  }

  movieSelected = (event) => {
    // console.log(`THIS IS EVENT`,`${event.target.value}`);

    console.log(`before reset state`,`${this.state.moviesCheckedOut.typeOf}`)

    this.setState({moviesCheckedOut: this.state.moviesCheckedOut + 1});

    console.log('after reset state', `${this.state.moviesCheckedOut}`)
  }

  render() {
    return (
    <div>
      {this.props.customers.map((customer, index)=>{
      console.log('customer', customer)

      return <div key={index}>
      <h1 key={customer.id}>{customer.name}</h1>
      <button key={index} value={customer.name} onClick={this.movieSelected}>Select for Rental</button>
      </div>
      })
      }
    </div>);
  }
}


export default Customers;
