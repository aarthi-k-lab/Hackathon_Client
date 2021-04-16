import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../stylesheet/style.css";
import axios from "axios";
class Users extends Component {
  state = { users: [{}] };

  componentDidMount = async (req, res) => {
    try {
      const api = axios.create({
        baseURL: `https://immense-sands-26614.herokuapp.com/`,
      });
      const usersResponse = await api.get("/");
      let users = await usersResponse.data;
      this.setState({ users });
    } catch (err) {
      console.log(err);
    }
  };

  handleDelete = async (user) => {
    try {
      const api = axios.create({
        baseURL: `https://immense-sands-26614.herokuapp.com/`,
      });
      const usersResponse = await api.delete("/" + user._id, user);
      let users = await usersResponse.data;

      const newusersResponse = await api.get("/");
      let newusers = await newusersResponse.data;
      this.setState({ users: newusers });

      //deleting reservations of that user
      this.deleteReservation(user._id);
    } catch (err) {
      console.log(err);
    }
  };

  deleteReservation = async (id) => {
    let reservationmockapiurl =
      "https://immense-sands-26614.herokuapp.com/api/reservations/";
    try {
      const reservationResponse = await fetch(reservationmockapiurl);
      let reservations = await reservationResponse.json();
      reservations.map(async (reservation) => {
        if (reservation.userId == id) {
          let mockapideleteurl = reservationmockapiurl + reservation._id;
          try {
            const reservationResponse = await fetch(mockapideleteurl, {
              method: "DELETE",
              body: JSON.stringify(reservation),
              headers: {
                "Content-type": "application/json;characterset=UTF-8",
              },
            });
            await reservationResponse.json();
          } catch (error) {
            console.log(error);
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div
        className="userList table"
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
                Email
              </th>
              <th style={{ color: "white" }} scope="col">
                Role
              </th>
              <th style={{ color: "white" }} scope="col">
                Phone
              </th>
              <th style={{ color: "white" }} scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, index) => (
              <tr key={index}>
                <td style={{ color: "white" }} scope="row">
                  {user.username}
                </td>
                <td style={{ color: "white" }} scope="row">
                  {user.email}
                </td>
                <td style={{ color: "white" }} scope="row">
                  {user.role}
                </td>
                <td style={{ color: "white" }} scope="row">
                  {user.phone}
                </td>
                <td style={{ color: "white" }} scope="row">
                  <button
                    className="btn btn-danger"
                    onClick={() => this.handleDelete(user)}
                  >
                    Delete ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Users;
