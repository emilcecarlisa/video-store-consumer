import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Library extends Component {
  static propTypes = {
    updateStatusCallback: PropTypes.func.isRequired
  };

  componentDidMount (){
      this.props.updateStatusCallback('Loaded library.', 'success');
  }
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
            <img src={movie.image_url} alt="movie image"/>
          </div>
        })

      }

    </div>
  )
}
}


export default Library;
