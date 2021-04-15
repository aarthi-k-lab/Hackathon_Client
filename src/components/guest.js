import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ViewMovie from "./viewmovie.js";
import MovieDetails from "./moviedetails.js";
class Guest extends Component {
  state = { detailFlag: false, movies: [{}], movie: {} };

  componentDidMount = async () => {
    let mockapiurl = "http://immense-sands-26614.herokuapp.com/api/movies/";
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
      <div className="BookATick ">
        <h1>Book A Tick</h1>
        <h3>Welcome to Book- A -Tick Website</h3>
        <h6>Booking made easy</h6>

        {this.state.detailFlag == false ? (
          <div className="row">
            {this.state.movies.length > 0 ? (
              this.state.movies.map((movie) => (
                <div key={movie._id} className="col-sm-3">
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
    );
  }
}

export default Guest;
