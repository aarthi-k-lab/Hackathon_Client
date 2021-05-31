import React, { Component } from "react";
import Seat from "./seat.js";
import BookingConfirm from "./bookconfirm.js";
class Booking extends Component {
  state = { theatre: {}, count: 0, seats: [[]], bookconfirmflag: false };

  componentDidMount = () => {
    let seats = this.props.theatre.seats;
    this.setState({ seats });
    let theatre = this.props.theatre;
    this.setState({ theatre });
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
      this.setState({ seats: newTheatres.seats });
    } catch (error) {
      console.log(error);
    }
  };

  handleSelect = async (event, key, index1, index2) => {
    let seats = this.state.seats;
    if (event.target.className == "seat selected") {
      this.setState({ count: this.state.count - 1 });
      event.target.className = "seat";
      seats[index1][index2][key] = true;
      this.setState({ seats });
    } else {
      if (this.state.count < this.props.totalSeats) {
        this.setState({ count: this.state.count + 1 });
        event.target.className = "seat selected";
        seats[index1][index2][key] = "selected";
        await this.handleTheatreSave(
          this.props.theatre._id,
          seats,
          this.props.theatre.name,
          this.props.theatre.ticketPrice,
          this.props.theatre.city,
          this.props.theatre.seatsAvailable,
          this.props.theatre.image
        );
        this.setState({ seats });
      }
    }

    setTimeout(
      async function () {
        let seats = this.state.seats;
        if (seats[index1][index2][key] == "selected") {
          seats[index1][index2][key] = true;
          await this.handleTheatreSave(
            this.props.theatre._id,
            seats,
            this.props.theatre.name,
            this.props.theatre.ticketPrice,
            this.props.theatre.city,
            this.props.theatre.seatsAvailable,
            this.props.theatre.image
          );
          this.setState({ count: this.state.count - 1 });
          event.target.className = "seat";
          this.setState({ seats });
        }
      }.bind(this),
      60000
    );
  };

  handleBack = async () => {
    let seats = this.state.seats;
    seats.map((seatrow) => {
      seatrow.map((seat) => {
        {
          Object.keys(seat).map((key) => {
            if (seat[key] == "selected") seat[key] = true;
          });
        }
      });
    });
    await this.handleTheatreSave(
      this.props.theatre._id,
      seats,
      this.props.theatre.name,
      this.props.theatre.ticketPrice,
      this.props.theatre.city,
      this.props.theatre.seatsAvailable,
      this.props.theatre.image
    );
    this.props.onback();
  };

  handleBook = () => {
    if (this.state.count < this.props.totalSeats) {
      alert(this.props.totalSeats + " seats must be selected");
    } else {
      this.setState({ bookconfirmflag: true });
    }
  };

  handleBookConfirmFlag = () => {
    this.setState({ bookconfirmflag: false });
  };

  booked = () => {
    this.setState({ bookconfirmflag: false });
    this.props.booked();
  };

  render() {
    const { theatre, totalSeats, showtime, onback, bookDate, booked, user } =
      this.props;
    return (
      <>
        {this.state.bookconfirmflag == false ? (
          <>
            <br></br>
            <div className="col-12">
              <div
                className="row"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="col-12 col-md-1">
                  <button
                    className="btn btn-danger btn-lg movieListBtn btn-outline-warning"
                    data-toggle="button"
                    aria-pressed="false"
                    autoComplete="off"
                    onClick={() => this.handleBack()}
                  >
                    Back
                  </button>
                </div>
                <div
                  className="bookHeader col-12 col-md-4"
                  style={{
                    marginTop: "15px",
                    backgroundColor: "rgb(23, 162, 184)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h5 className="noOfTicket">No Of Tickets: {totalSeats}</h5>
                  <br></br>
                  <h5 className="showTime">ShowTime: {showtime.startAt}</h5>
                  <br></br>
                  <h5 className="showTime">Book on: {bookDate}</h5>
                </div>
                <div className="bookBody col-9">
                  <ul className="showcase">
                    <li>
                      <div className="seat"></div>
                      <small>N/A</small>
                    </li>
                    <li>
                      <div className="seat selected"></div>
                      <small>Selected</small>
                    </li>
                    <li>
                      <div className="seat occupied"></div>
                      <small>Occupied</small>
                    </li>
                  </ul>
                  <div className="container">
                    <div className="screen"></div>
                    {theatre.seats.map((seatrow, index1) => {
                      return (
                        <div className="row">
                          {seatrow.map((seat, index2) => {
                            return (
                              <Seat
                                key={index1 + index2}
                                seat={seat}
                                onSelect={this.handleSelect}
                                index1={index1}
                                index2={index2}
                                showtime={showtime}
                                bookDate={bookDate}
                              ></Seat>
                            );
                          })}
                        </div>
                      );
                    })}
                    <br></br>
                    <button
                      className="btn btn-success"
                      data-toggle="button"
                      aria-pressed="false"
                      autoComplete="off"
                      onClick={() => this.handleBook()}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <BookingConfirm
            showtime={showtime}
            totalSeats={totalSeats}
            bookDate={bookDate}
            onback={this.handleBookConfirmFlag}
            seats={this.state.seats}
            booked={this.booked}
            user={user}
          />
        )}
      </>
    );
  }
}

export default Booking;
