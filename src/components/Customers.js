import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Customers extends Component {
  onClickCustomer = (customer) => {
    console.log(`customer ${customer.id} clicked (${customer.name})`);
    // this.props.selectedCustomerCallback(event.target.value);
    this.props.selectedCustomerCallback(customer)
  };

  render() {
    let numMovies = this.props.moviesCheckedOut ;
    return (
    <div>
      {this.props.customers.map((customer, index)=>{

      return <div key={index}>
      <h1 key={customer.id}>{customer.name}</h1>
      <p>{customer.movies_checked_out_count} movies checked out</p>
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
