import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Reservation from "./reservation.js";
import "../stylesheet/style.css";
import axios from "axios";
class Reservations extends Component {
  state = { reservations: [{}] };

  componentDidMount = async (req, res) => {
    try {
      const api = axios.create({
        baseURL: `http://immense-sands-26614.herokuapp.com/api/reservations`,
      });
      const reservationResponse = await api.get("/");
      let reservations = await reservationResponse.data;

      this.setState({ reservations });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div
        className="ReservationList table"
        style={{
          display: "table",
          padding: "2px",
          borderRadius: "5px",
          border: "1px solid #999",
        }}
      >
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Movie</th>
              <th scope="col">Theatre</th>
              <th scope="col">date(yyyy-MM-DD)</th>
              <th scope="col">slot</th>
              <th scope="col">Seats</th>
              <th scope="col">total paid</th>
            </tr>
          </thead>
          <tbody>
            {this.state.reservations.map((reservation) => (
              <Reservation key={reservation._id} reservation={reservation} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Reservations;
