import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Movie from './Movie'

export default class Moives extends Component {
  render() {
    console.log(this.props.movie);
    return (
      <div>
        <Card>
          {this.props.movie.slice(0, 5).map((title, idx) => (
            <Movie key={idx} title={title.movie} description={title.description} />
          ))
          }
        </Card>
      </div>
    )
  }
}

