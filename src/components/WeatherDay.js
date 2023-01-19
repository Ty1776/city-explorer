import React from "react";

export default class WeatherDay extends React.Component {

  render() {
    return (
      <>
        <div key={this.props.idx}>
          <p>Date: {this.props.date}</p>
          <p>Weather: {this.props.description}</p>
        </div>
      </>
    )
  }
}
