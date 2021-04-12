import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../stylesheet/style.css";
import axios from "axios";
class Users extends Component {
  state = { users: [{}] };

  componentDidMount = async (req, res) => {
    try {
      const api = axios.create({
        baseURL: `http://immense-sands-26614.herokuapp.com/`,
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
        baseURL: `http://immense-sands-26614.herokuapp.com/`,
      });
      const usersResponse = await api.delete("/" + user._id, user);
      let users = await usersResponse.data;

      const newusersResponse = await api.get("/");
      let newusers = await newusersResponse.data;
      this.setState({ users: newusers });
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
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Phone</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user) => (
              <tr>
                <td scope="row">{user.username}</td>
                <td scope="row">{user.email}</td>
                <td scope="row">{user.role}</td>
                <td scope="row">{user.phone}</td>
                <td scope="row">
                  <button onClick={() => this.handleDelete(user)}>
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
