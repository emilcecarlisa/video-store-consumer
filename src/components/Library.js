import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Library extends Component {
  onClickMovieRental = ((event) => {
    console.log('onClickMovieRental', event.target.value)
    this.props.selectedMovieCallback(event.target.value);
  });

  render() {
    return(
      <div>
        {console.log(this.props.libraryMovies, 'library Movies')}

        {this.props.libraryMovies.map((movie, index)=>{
          console.log('movie', movie)
          return <div key={movie.id}>{movie.title}
            <button key={index} value={movie.title} onClick={this.onClickMovieRental}>Rental Library Selection</button>
          </div>
        })

      }

    </div>
  )
}
}


export default Library;
