import React, { Component } from 'react'

export default class Weather extends Component {
  render() {
    return (
      <div>
      {this.props.weather.map((day, idx) => (
        <div key={idx}>
        <p>Date: {day.date}</p>
        <p>Weather: {day.description}</p>
        </div>
      ))
      }
      </div>
    )
  }
}
