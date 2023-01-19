import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import WeatherDay from './WeatherDay';

export default class Weather extends Component {
  render() {
    console.log(this.props.weather);
    return (
      <div>
        <Card>
          {this.props.weather.map((day, idx) => (
            <WeatherDay key={idx} date={day.date} description={day.description} />
          ))
          }
        </Card>
      </div>
    )
  }
}
