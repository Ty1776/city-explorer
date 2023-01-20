import React from "react";

export default class Movie extends React.Component {

  render() {
    return (
      <>
        <div key={this.props.idx}>
          <p>Title: {this.props.title}</p>
          <p>Description: {this.props.description}</p>
        </div>
      </>
    )
  }
}
