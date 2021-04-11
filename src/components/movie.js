import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
class Movie extends Component {
  state = {};
  render() {
    const { movie } = this.props;
    return (
      <>
        <Card className="m-3">
          <img src={movie.image} alt={movie.title} height="300px" />
          <Card.Body>
            <Card.Title style={{ color: "blue" }}>{movie.title}</Card.Title>
            <Card.Title>Rs. {movie.genre}</Card.Title>
            <Card.Text>{movie.description}</Card.Text>
            <div>
              <button className="btn btn-primary m-2">Edit</button>
              <button className="btn btn-primary m-2">Delete</button>
              <button className="btn btn-primary m-2">View</button>
            </div>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default Movie;
