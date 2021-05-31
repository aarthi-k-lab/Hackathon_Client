import React, { Component } from "react";
import Reservations from "./reservations.js";
import Theatres from "./theatres.js";
import ShowTimes from "./showtimes.js";
import Users from "./users.js";
import Movies from "./movies.js";
import Guest from "./guest.js";
class Admin extends Component {
  state = {
    bookmovieflag: true,
    movieListFlag: false,
    theatreListFlag: false,
    showTimeListFlag: false,
    userListFlag: false,
    bookedMoviesListFlag: false,
  };
  render() {
    const { user } = this.props;
    return (
      <>
        <br></br>
        <div
          className="row admin_navbar"
          style={{ border: "1px solid #242333", backgroundColor: "#17a2b8" }}
        >
          <div className="col-4 col-md-2">
            <button
              className="btn btn-info btn-lg btn-block btn-outline-light movieListBtn"
              data-toggle="button"
              aria-pressed="false"
              autoComplete="off"
              onClick={() => {
                this.setState({
                  bookmovieflag: true,
                  movieListFlag: false,
                  theatreListFlag: false,
                  showTimeListFlag: false,
                  userListFlag: false,
                  bookedMoviesListFlag: false,
                });
              }}
            >
              Book Movie
            </button>
          </div>
          <div className="col-4 col-md-2">
            <button
              className="btn btn-info btn-lg btn-block btn-outline-light movieListBtn"
              data-toggle="button"
              aria-pressed="false"
              autoComplete="off"
              onClick={() => {
                this.setState({
                  bookmovieflag: false,
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
          </div>
          <div className="col-4 col-md-2">
            <button
              className="btn btn-info btn-lg btn-block btn-outline-light movieListBtn"
              data-toggle="button"
              aria-pressed="false"
              autoComplete="off"
              onClick={() => {
                this.setState({
                  bookmovieflag: false,
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
          </div>
          <div className="col-4 col-md-2">
            <button
              className="btn btn-info btn-lg btn-block btn-outline-light movieListBtn"
              data-toggle="button"
              aria-pressed="false"
              autoComplete="off"
              onClick={() => {
                this.setState({
                  bookmovieflag: false,
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
          </div>
          <div className="col-4 col-md-2">
            <button
              className="btn btn-info btn-lg btn-block btn-outline-light movieListBtn"
              data-toggle="button"
              aria-pressed="false"
              autoComplete="off"
              onClick={() => {
                this.setState({
                  bookmovieflag: false,
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
          </div>
          <div className="col-4 col-md-2">
            <button
              className="btn btn-info btn-lg btn-block btn-outline-light movieListBtn"
              data-toggle="button"
              aria-pressed="false"
              autoComplete="off"
              onClick={() => {
                this.setState({
                  bookmovieflag: false,
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
        </div>
        {this.state.bookmovieflag == true ? (
          <Guest user={user} />
        ) : this.state.movieListFlag == true ? (
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
