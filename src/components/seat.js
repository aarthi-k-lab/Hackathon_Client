import React, { Component } from "react";
class Seat extends Component {
  state = { reservations: [{}], keys: [], count: 0, seatsbooked: [] };

  componentDidMount = async () => {
    let mockapiurl =
      "http://immense-sands-26614.herokuapp.com/api/reservations";
    try {
      const reservationResponse = await fetch(mockapiurl);
      let reservations = await reservationResponse.json();
      this.setState({ reservations });

      let seatsbooked = [];
      reservations.map((reservation) => {
        if (
          reservation.cinemaId == this.props.showtime.cinemaId &&
          reservation.movieId == this.props.showtime.movieId &&
          reservation.startAt == this.props.showtime.startAt
        ) {
          seatsbooked = reservation.seats;
        }

        this.setState({ seatsbooked });
      });

      let keys = Object.keys(this.props.seat);
      this.setState({ keys });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { seat, onSelect, index1, index2, showtime } = this.props;
    return (
      <>
        {this.state.keys.map((key) => {
          if (!this.state.seatsbooked.includes(key) && seat[key] == true) {
            return (
              <div
                className="seat"
                onClick={(event) => onSelect(event, key, index1, index2)}
              ></div>
            );
          } else if (
            this.state.seatsbooked.includes(key) ||
            seat[key] == false
          ) {
            return <div className="seat occupied"></div>;
          } else {
            return (
              <div
                className="seat selected"
                onClick={(event) => onSelect(event, key, index1, index2)}
              ></div>
            );
          }
        })}
      </>
    );
  }
}

export default Seat;
