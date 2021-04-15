import React, { Component } from "react";
import moment from "moment";

class Seat extends Component {
  state = { reservations: [{}], keys: [], count: 0, seatsbooked: [] };

  componentDidMount = async () => {
    let mockapiurl =
      "https://immense-sands-26614.herokuapp.com/api/reservations";
    try {
      const reservationResponse = await fetch(mockapiurl);
      let reservations = await reservationResponse.json();
      this.setState({ reservations });

      let seatsbooked = [];
      reservations.map((reservation) => {
        let date = moment(reservation.date).format("YYYY-MM-DD");
        if (
          reservation.cinemaId == this.props.showtime.cinemaId &&
          reservation.movieId == this.props.showtime.movieId &&
          reservation.showtimeId == this.props.showtime._id &&
          date == this.props.bookDate
        ) {
          reservation.seats.map((seat) => {
            seatsbooked = [...seatsbooked, seat];
          });
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
    const { seat, onSelect, index1, index2, showtime, bookDate } = this.props;
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
