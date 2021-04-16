import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ViewMovie from "./viewmovie.js";
import MovieDetails from "./moviedetails.js";
class Guest extends Component {
  state = { detailFlag: false, movies: [{}], movie: {} };

  componentDidMount = async () => {
    let mockapiurl = "https://immense-sands-26614.herokuapp.com/api/movies/";
    try {
      const moviesResponse = await fetch(mockapiurl);
      let movies = await moviesResponse.json();
      this.setState({ movies });
    } catch (error) {
      console.log(error);
    }
  };
  handleView = (movie) => {
    this.setState({
      detailFlag: true,
    });
    this.setState({ movie });
  };

  booked = () => {
    this.setState({ detailFlag: false });
  };

  handleMovie = () => this.setState({ detailFlag: false });
  render() {
    const { user } = this.props;
    return (
      <>
        <br></br>
        <div className="BookATick container-fluid">
          <div className="row">
            <div className="col-12">
              <h1 style={{ textAlign: "center" }}>Book A Tick</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h3 style={{ textAlign: "center" }}>
                Welcome to Book- A -Tick Website
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h6 style={{ textAlign: "center" }}>Booking made easy</h6>
            </div>
          </div>

          {this.state.detailFlag == false ? (
            <div className="row">
              {this.state.movies.length > 0 ? (
                this.state.movies.map((movie, index) => (
                  <div key={index} className="col-sm-3">
                    <ViewMovie movie={movie} onView={this.handleView} />
                  </div>
                ))
              ) : (
                <div>Sorry there is no movies at present</div>
              )}
            </div>
          ) : (
            <MovieDetails
              movie={this.state.movie}
              onView={this.handleMovie}
              booked={this.booked}
              user={user}
            />
          )}
        </div>
      </>
    );
  }
}

export default Guest;
