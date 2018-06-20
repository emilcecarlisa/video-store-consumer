import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Library extends Component {
  render() {
    return(
      <div>
      {console.log(this.props.libraryMovies, 'library Movies')}
      {this.props.libraryMovies.map((movie, index)=>{
        console.log('movie', movie)
      return <div key={movie.id}>{movie.title}</div>
      })
      }
      </div>
    )
  }
}


export default Library;
