import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Library extends Component {
  render() {
    return(
      <div>
      <h2>Library of all Movies:</h2>
      {this.props.libraryMovies.map((movie)=>{

      return <div key={movie.id}>{movie.title}</div>
      })
      }
      </div>
    )
  }
}


export default Library;
