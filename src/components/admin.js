import React, { Component } from "react";
import Reservations from "./reservations.js";
import Theatres from "./theatres.js";
import ShowTimes from "./showtimes.js";
import Users from "./users.js";
import Movies from "./movies.js";
class Admin extends Component {
  state = {
    movieListFlag: true,
    theatreListFlag: false,
    showTimeListFlag: false,
    userListFlag: false,
    bookedMoviesListFlag: false,
  };
  render() {
    return (
      <>
        <div className="admin_navbar">
          <button
            className="btn btn-primary movieListBtn"
            onClick={() => {
              this.setState({
                movieListFlag: true,
                theatreListFlag: false,
                showTimeListFlag: false,
                userListFlag: false,
                bookedMoviesListFlag: false,
              });
            }}
          >
            Movie List
          </button>
          <button
            className="btn btn-primary theatreListBtn"
            onClick={() => {
              this.setState({
                movieListFlag: false,
                theatreListFlag: true,
                showTimeListFlag: false,
                userListFlag: false,
                bookedMoviesListFlag: false,
              });
            }}
          >
            Theatre List
          </button>
          <button
            className="btn btn-primary showTimesBtn"
            onClick={() => {
              this.setState({
                movieListFlag: false,
                theatreListFlag: false,
                showTimeListFlag: true,
                userListFlag: false,
                bookedMoviesListFlag: false,
              });
            }}
          >
            Show Time List
          </button>
          <button
            className="btn btn-primary userListBtn"
            onClick={() => {
              this.setState({
                movieListFlag: false,
                theatreListFlag: false,
                showTimeListFlag: false,
                userListFlag: true,
                bookedMoviesListFlag: false,
              });
            }}
          >
            User List
          </button>
          <button
            className="btn btn-primary bookedMoviesBtn"
            onClick={() => {
              this.setState({
                movieListFlag: false,
                theatreListFlag: false,
                showTimeListFlag: false,
                userListFlag: false,
                bookedMoviesListFlag: true,
              });
            }}
          >
            Booked Movies
          </button>
        </div>

        {this.state.movieListFlag == true ? (
          <Movies />
        ) : this.state.theatreListFlag == true ? (
          <Theatres />
        ) : this.state.showTimeListFlag == true ? (
          <ShowTimes />
        ) : this.state.userListFlag == true ? (
          <Users />
        ) : (
          <Reservations />
        )}
      </>
    );
  }
}

export default Admin;
