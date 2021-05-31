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
        <div className="container-fluid clientNavbar">
          <br></br>
          <div className="row">
            <div className="col-12 col-sm-4">
              <h3 className="welcomeText">Welcome {user.username}</h3>
            </div>
            <div className="col-12 col-sm-4">
              <h3 className="role">Role: {user.role}</h3>
            </div>
            <div className="col-12 col-sm-4">
              <button className="btn btn-danger" onClick={onLogOut}>
                LogOut
              </button>
            </div>
          </div>
        </div>
        {user.role == "admin" ? <Admin user={user} /> : <Guest user={user} />}
      </>
    );
  }
}

export default Client;
