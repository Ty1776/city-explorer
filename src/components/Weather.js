import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

export default class Weather extends Component {
  render() {
    console.log(this.props.weather);
    return (
      <div>
        <Card>
          {this.props.weather.map((day, idx) => (
            <div key={idx}>
              <p>Date: {day.date}</p>
              <p>Weather: {day.description}</p>
            </div>
          ))
          }
        </Card>
      </div>
    )
  }
}
