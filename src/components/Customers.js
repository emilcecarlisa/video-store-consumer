import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Customers extends Component {
  render() {
    return (

    <div>
      {this.props.customers.map((customer, index)=>{
      console.log('customer', customer)

      return <h1 key={customer.id}>{customer.name}</h1>
      })
      }
    </div>);
  }
}


export default Customers;
