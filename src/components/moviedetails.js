import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import BookTickets from "./bookTicket.js";
import moment from "moment";

import Booking from "./booking.js";
class MovieDetails extends Component {
  state = {
    showTimes: [{}],
    bookDate: null,
    bookFlag: false,
    theatreflag: false,
    theatre: {},
    totalSeats: 0,
    showtime: {},
  };
  handleBooking = async () => {
    const bookedDate = moment(this.state.bookDate).format("DD-MM-YYYY");
    if (this.state.bookDate == null) {
      alert("Please enter date for bookin");
    } else {
      let mockapiurl =
        "https://immense-sands-26614.herokuapp.com/api/showtimes/";
      try {
        const showTimeResponse = await fetch(mockapiurl);
        let showTimes = await showTimeResponse.json();
        let stateshowtimes = [];
        showTimes.map((showtime) => {
          const startDate = moment(showtime.startDate).format("DD-MM-YYYY");
          const endDate = moment(showtime.endDate).format("DD-MM-YYYY");

          var d1 = startDate.split("-");
          var d2 = endDate.split("-");
          var c = bookedDate.split("-");

          var from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
          var to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
          var check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

          if (
            check >= from &&
            check <= to &&
            this.props.movie._id == showtime.movieId
          ) {
            stateshowtimes = [...stateshowtimes, showtime];
            this.setState({ bookFlag: true });
          }
        });
        this.setState({ showTimes: stateshowtimes });

        if (this.state.bookFlag == false) {
          alert("Sorry no showtimes for this movie on the mentioned date");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  handleBack = () => {
    this.setState({
      bookDate: null,
      bookFlag: false,
    });
  };

  handleBookBack = () => {
    this.setState({
      theatre: {},
      theatreflag: false,
      totalSeats: 0,
      showtime: {},
    });
  };

  getTheatre = async (id) => {
    let mockapiurl =
      "https://immense-sands-26614.herokuapp.com/api/theatres/" + id;
    try {
      const theatreResponse = await fetch(mockapiurl);
      let theatre = await theatreResponse.json();
      return theatre;
    } catch (error) {
      console.log(error);
    }
  };

  handleBook = async (showtime) => {
    let seatsNo = window.prompt(
      "Enter the number of seats to be booked: ",
      "0"
    );
    let isnum = /^\d+$/.test(seatsNo);
    if (!isnum) {
      alert("please provide numbers only");
    } else {
      seatsNo = parseInt(seatsNo);
      if (seatsNo > 0) {
        let theatre = await this.getTheatre(showtime.cinemaId);

        if (seatsNo <= 0) {
          alert("sorry the seats are not available");
        }
        if (theatre.seatsAvailable < seatsNo) {
          alert("sorry the seats are not available");
        } else {
          this.setState({
            theatre: theatre,
            theatreflag: true,
            totalSeats: seatsNo,
            showtime: showtime,
          });
        }
      } else {
        alert("please provide the number greater than 0");
      }
    }
  };

  booked = () => {
    this.setState({ bookFlag: false, theatreflag: false });
    this.props.booked();
  };
  render() {
    const { movie, onView, booked, user } = this.props;
    const formattedReleaseDate = moment(movie.releaseDate).format("DD-MM-YYYY");
    return (
      <>
        {this.state.bookFlag == false ? (
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
                <div>
                  <label htmlFor="bookDate">Booking Date</label>
                  <input
                    type="date"
                    id="bookDate"
                    name="bookDate"
                    onChange={(event) =>
                      this.setState({ bookDate: event.target.value })
                    }
                  ></input>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={this.handleBooking}
                >
                  Book Now
                </button>
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
        ) : this.state.theatreflag == false ? (
          <BookTickets
            movie={movie}
            showTimes={this.state.showTimes}
            onBack={this.handleBack}
            onBooking={this.handleBook}
          />
        ) : (
          <Booking
            theatre={this.state.theatre}
            totalSeats={this.state.totalSeats}
            showtime={this.state.showtime}
            onback={this.handleBookBack}
            bookDate={this.state.bookDate}
            booked={this.booked}
            user={user}
          />
        )}
      </>
    );
  }
}

export default MovieDetails;
