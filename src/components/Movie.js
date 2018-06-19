import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Movie extends Component {
  constructor() {
    super();

    this.state ={
      moviename: '',
    };
  }

 onInputChange = (event) => {
let updatedInput = {};
updatedInput[event.target.name] =
event.target.value;
this.setState(updatedInput);
 }

  onFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.props.getMoviesCallback(this.state);

    this.setState({
      moviename:'',
    });
  }

  render() {

    return(
      <section>
        <form onSubmit = {this.onFormSubmit}>
          <div>
            <label htmlFor = "moviename">What Movie are you looking for?</label>
            <input type="text"
              name = "moviename"
              value = {this.state.moviename}
              onChange={this.onInputChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </section>
    )
  }

}

export default Movie;
