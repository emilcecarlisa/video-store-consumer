import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Customers extends Component {        onClickCustomer = (customer) => {
    this.props.selectedCustomerCallback(customer)
  }
  componentDidMount (){
      this.props.updateStatusCallback('Loading customers...', 'success');
  }
  onClickCustomer = ((event) => {
    this.props.selectedCustomerCallback(event.target.value);
  });
  render() {
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
Customers.propTypes = {
  customers: PropTypes.array,
  updateStatusCallback: PropTypes.func.isRequired
}
export default Customers;
