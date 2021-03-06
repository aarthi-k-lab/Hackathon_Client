import React, { Component } from "react";
class BookingConfirm extends Component {
  state = { theatre: {}, movie: {}, bookedflag: false, reservation: {} };

  componentDidMount = async () => {
    let mockapiurl =
      "https://immense-sands-26614.herokuapp.com/api/theatres/" +
      this.props.showtime.cinemaId;
    try {
      const theatreResponse = await fetch(mockapiurl);
      let theatre = await theatreResponse.json();
      this.setState({ theatre });
    } catch (error) {
      console.log(error);
    }
    let mockapimovieurl =
      "https://immense-sands-26614.herokuapp.com/api/movies/" +
      this.props.showtime.movieId;
    try {
      const movieResponse = await fetch(mockapimovieurl);
      let movie = await movieResponse.json();
      this.setState({ movie });
    } catch (error) {
      console.log(error);
    }
  };

  handleTheatreSave = async (
    id,
    seats,
    name,
    ticketPrice,
    city,
    seatsAvailable,
    image
  ) => {
    const newTheatre = {
      seats: seats,
      name: name,
      ticketPrice: ticketPrice,
      city: city,
      seatsAvailable: seatsAvailable,
      image: image,
    };
    let mockapiurl = "https://immense-sands-26614.herokuapp.com/api/theatres/";
    let mockapiputrurl = mockapiurl + id;
    try {
      const theatreResponse = await fetch(mockapiputrurl, {
        method: "PUT",
        body: JSON.stringify(newTheatre),
        headers: { "Content-type": "application/json;characterset=UTF-8" },
      });
      let theatre = await theatreResponse.json();
      if (theatre.name == "MongoError") {
        alert("some format error while storing");
      }
      const newTheatres = await (await fetch(mockapiputrurl)).json();
      this.setState({ theatre: newTheatres });
    } catch (error) {
      console.log(error);
    }
  };

  handleConfirm = async () => {
    let seatReserved = [];
    let seats = this.props.seats;
    seats.map((seatrow) => {
      seatrow.map((seat) => {
        {
          Object.keys(seat).map((key) => {
            if (seat[key] == "selected") {
              seatReserved.push(key);
              seat[key] = true;
            }
          });
        }
      });
    });
    await this.handleTheatreSave(
      this.state.theatre._id,
      seats,
      this.state.theatre.name,
      this.state.theatre.ticketPrice,
      this.state.theatre.city,
      this.state.theatre.seatsAvailable,
      this.state.theatre.image
    );

    this.setState({ bookedflag: true });
    await this.handleAddingReservations(
      seatReserved,
      this.props.bookDate,
      this.props.showtime.startAt,
      this.state.theatre.ticketPrice,
      this.state.theatre.ticketPrice * this.props.totalSeats,
      this.props.showtime._id,
      this.props.user.username,
      this.props.user.phone,
      this.props.showtime.cinemaId,
      this.state.movie._id,
      this.props.user._id
    );

    // );

    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "aarthiak2103@gmail.com",
      Password: "F29B7D6C95D43CB05A75BFA76778D63C1DC4",
      To: this.props.user.email,
      From: "aarthiak2103@gmail.com",
      Subject: "Book A Tick- Confirmation",
      Body:
        "<html><h1 style='color:green'>Booking is confirmed. Thanks for booking tickets with us. Ticket has been booked for movie </h1><img src='" +
        this.state.movie.image +
        "'/><table><tbody><tr><th>Booking id: </th><td>" +
        this.state.reservation._id +
        "</td></tr><tr><th>Movie Name </th><td>" +
        this.state.movie.title +
        "</td></tr><tr><th>Theatre name </th><td>" +
        this.state.theatre.name +
        " </td></tr><tr><th>Booking Date </th><td>" +
        this.props.bookDate +
        " </td></tr><tr><th>Show Time </th><td>" +
        this.props.showtime.startAt +
        "</td></tr><tr><th>Seat Number  </th><td>" +
        seatReserved.join(",") +
        "</td></tr></tbody></table>. Have a great movie!!</html>",
    }).then((message) => console.log());
  };

  handleAddingReservations = async (
    seats,
    date,
    startAt,
    ticketPrice,
    total,
    showtimeId,
    username,
    phone,
    cinemaId,
    movieId,
    userId
  ) => {
    const newReservations = {
      seats: seats,
      date: date,
      startAt: startAt,
      ticketPrice: ticketPrice,
      total: total,
      showtimeId: showtimeId,
      username: username,
      phone: phone,
      cinemaId: cinemaId,
      movieId: movieId,
      userId: userId,
    };
    let mockapiurl =
      "https://immense-sands-26614.herokuapp.com/api/reservations";
    try {
      const resevationResponse = await fetch(mockapiurl, {
        method: "POST",
        body: JSON.stringify(newReservations),
        headers: { "Content-type": "application/json;characterset=UTF-8" },
      });
      let reservation = await resevationResponse.json();
      if (reservation.name == "MongoError") {
        alert("some format error while storing");
      }
      this.setState({ reservation });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { showtime, totalSeats, bookDate, onback, seats, booked, user } =
      this.props;
    return (
      <>
        {this.state.bookedflag == false ? (
          <div className="col-12" style={{ margin: "15px" }}>
            <h1>MovieName: {this.state.movie.title}</h1>
            <h1>TheatreName: {this.state.theatre.name}</h1>
            <h4>Show time: {showtime.startAt}</h4>
            <h4>Book Date: {bookDate}</h4>
            <h4>Total Seats: {totalSeats}</h4>
            <h4>Total Price: {this.state.theatre.ticketPrice * totalSeats}</h4>

            <button
              className="btn btn-outline-success"
              data-toggle="button"
              aria-pressed="false"
              autoComplete="off"
              style={{ marginRight: "15px" }}
              onClick={() => this.handleConfirm()}
            >
              Confirm and Book
            </button>

            <button
              className="btn btn-outline-success"
              data-toggle="button"
              aria-pressed="false"
              autoComplete="off"
              onClick={() => onback()}
            >
              Back
            </button>
          </div>
        ) : (
          <div className="col-12" style={{ margin: "15px" }}>
            <h1>Thank you for booking ticket.</h1>
            <h6>
              Booking confirmed for movie {this.state.movie.title} in{" "}
              {this.state.theatre.name} theatre for the date {bookDate},
              {showtime.startAt}{" "}
            </h6>
            <button
              className="btn btn-outline-success"
              onClick={() => booked()}
            >
              Go Back to Home page
            </button>
          </div>
        )}
      </>
    );
  }
}

export default BookingConfirm;
