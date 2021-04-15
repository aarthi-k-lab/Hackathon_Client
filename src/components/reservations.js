import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Reservation from "./reservation.js";
import axios from "axios";
class Reservations extends Component {
  state = { reservations: [{}] };

  componentDidMount = async (req, res) => {
    try {
      const api = axios.create({
        baseURL: `https://immense-sands-26614.herokuapp.com/api/reservations`,
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
              <th style={{ color: "white" }} scope="col">
                Username
              </th>
              <th style={{ color: "white" }} scope="col">
                Movie
              </th>
              <th style={{ color: "white" }} scope="col">
                Theatre
              </th>
              <th style={{ color: "white" }} scope="col">
                date(yyyy-MM-DD)
              </th>
              <th style={{ color: "white" }} scope="col">
                slot
              </th>
              <th style={{ color: "white" }} scope="col">
                Seats
              </th>
              <th style={{ color: "white" }} scope="col">
                total paid
              </th>
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
