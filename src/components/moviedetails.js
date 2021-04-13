import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import moment from "moment";
class MovieDetails extends Component {
  state = {};
  render() {
    const { movie, onView } = this.props;
    const formattedReleaseDate = moment(movie.releaseDate).format("DD-MM-YYYY");
    return (
      <div className="movieDetails">
        <button className="btn btn-primary" onClick={() => onView()}>
          Back
        </button>
        <div className="row">
          <div className="col-sm-4">
            <Card className="sm-3 m-3">
              <img src={movie.image} alt={movie.title} height="300px" />
            </Card>
          </div>
          <div className="col-sm-6">
            <h1 className="movieName">{movie.title}</h1>
            <p className="duration">
              <b>Duration: </b>
              {movie.duration}
            </p>
            <p className="genre">
              <b>Genre: </b>
              {movie.genre}
            </p>
            <p className="releaseDate">
              <b>Release Date: </b>
              {formattedReleaseDate}
            </p>
            <p className="language">
              <b>Language: </b>
              {movie.language}
            </p>
            <button className="btn btn-primary">Book Now</button>
            <hr></hr>
            <h3 className="description">Description</h3>
            <p>{movie.description}</p>
            <p className="Cast">
              <b>Cast: </b>
              {movie.cast}
            </p>
            <p className="director">
              <b>Director: </b>
              {movie.director}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
