import React, { Component } from "react";
import moment from "moment";

class Reservation extends Component {
  state = { movie: {}, theatre: {}, user: {} };

  componentDidMount = async () => {
    let mockapitheatreurl =
      "https://immense-sands-26614.herokuapp.com/api/theatres/" +
      this.props.reservation.cinemaId;
    try {
      const theatresResponse = await fetch(mockapitheatreurl);
      let theatre = await theatresResponse.json();
      this.setState({ theatre });
    } catch (error) {
      console.log(error);
    }

    let mockapimovieurl =
      "https://immense-sands-26614.herokuapp.com/api/movies/" +
      this.props.reservation.movieId;
    try {
      const moviesResponse = await fetch(mockapimovieurl);
      let movie = await moviesResponse.json();
      this.setState({ movie });
    } catch (error) {
      console.log(error);
    }

    let mockapiuserurl =
      "https://immense-sands-26614.herokuapp.com/" +
      this.props.reservation.userId;
    try {
      const userResponse = await fetch(mockapiuserurl);
      let user = await userResponse.json();
      this.setState({ user });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { reservation } = this.props;

    const formattedDate = moment(reservation.date).format("yyyy-MM-DD");
    return (
      <tr>
        <td style={{ color: "white" }} scope="row">
          {this.state.user.username}
        </td>
        <td style={{ color: "white" }} scope="row">
          {this.state.movie.title}
        </td>
        <td style={{ color: "white" }} scope="row">
          {this.state.theatre.name}
        </td>
        <td style={{ color: "white" }} scope="row">
          {formattedDate}
        </td>
        <td style={{ color: "white" }} scope="row">
          {reservation.startAt}
        </td>
        <td style={{ color: "white" }} scope="row">
          {reservation.seats}
        </td>
        <td style={{ color: "white" }} scope="row">
          Rs. {reservation.total}
        </td>
      </tr>
    );
  }
}

export default Reservation;
