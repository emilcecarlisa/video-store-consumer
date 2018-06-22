import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Customers extends Component {         onClickCustomer = (customer) => {
  this.props.selectedCustomerCallback(customer)
}
componentDidMount (){
  this.props.updateStatusCallback('Loaded customers', 'success');
}

render() {
  return (
    <div id="customer-container">
    {this.props.customers.map((customer, index)=>{
      return <div className="item-list-container" key={index}>
      <h2 key={customer.id}>{customer.name}</h2>
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
