import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
class ViewMovie extends Component {
  state = {};
  render() {
    const { movie, onView } = this.props;
    return (
      <Card className="sm-3 m-3">
        <img src={movie.image} alt={movie.title} height="300px" />
        <Card.Body>
          <Card.Title style={{ color: "blue" }}>
            <b>{movie.title}</b>
          </Card.Title>
          <div>
            <button className="btn btn-info" onClick={() => onView(movie)}>
              view
            </button>
          </div>
        </Card.Body>
      </Card>
    );
  }
}

export default ViewMovie;
