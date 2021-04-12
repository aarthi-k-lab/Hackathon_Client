import React, { Component } from "react";
class ViewMovie extends Component {
  state = {};
  render() {
    const { movie } = this.props();
    return <div className="viewMovie"></div>;
  }
}

export default ViewMovie;
