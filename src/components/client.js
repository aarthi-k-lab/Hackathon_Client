import React, { Component } from "react";
import Admin from "./admin.js";
import Guest from "./guest.js";

class Client extends Component {
  state = {
    movie: {},
  };
  render() {
    const { user, onLogOut } = this.props;

    return (
      <>
        <div className="clientNavbar">
          <h1 className="welcomeText">Welcome {user.username}</h1>
          <h3 className="role">Role: {user.role}</h3>
          <button className="btn btn-danger" onClick={onLogOut}>
            LogOut
          </button>
        </div>
        {user.role == "admin" ? <Admin /> : <Guest user={user} />}
      </>
    );
  }
}

export default Client;
