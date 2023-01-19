import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

export default class Moives extends Component {
  render() {
    console.log(this.props.movie);
    return (
      <div>
        <Card>
          {this.props.movie.slice(0, 5).map((title, idx) => (
            <div key={idx}>
              <p>Title: {title.movie}</p>
              <p>Description: {title.description}</p>
            </div>
          ))
          }
        </Card>
      </div>
    )
  }
}