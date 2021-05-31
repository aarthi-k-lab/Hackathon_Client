import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginForm from "./login.js";
import SignUpForm from "./signUp.js";
class NonClient extends Component {
  state = {
    login: true,
  };
  render() {
    const { handleLogin, handleSignUp } = this.props;
    return (
      <>
        <div className="container-fluid LoginPage">
          <br></br>
          <div className="row">
            <div className="col-2 col-sm-4"></div>
            <div className="col-10 col-sm-7">
              <div className="row">
                <div className="col-6">
                  <button
                    className="btn btn-info btn-lg btn-block btn-outline-light"
                    onClick={() => this.setState({ login: true })}
                    data-toggle="button"
                    aria-pressed="false"
                    autoComplete="off"
                  >
                    Sign In
                  </button>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-info btn-lg btn-block btn-outline-light"
                    onClick={() => this.setState({ login: false })}
                    data-toggle="button"
                    aria-pressed="false"
                    autoComplete="off"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="row">
            <div
              className="col-12 col-md-6"
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "15px",
              }}
            >
              <h1 id="appName">Book-a-Tick</h1>
            </div>
            <div className="col-12 col-md-6">
              {this.state.login === true ? (
                <LoginForm onLogging={handleLogin} />
              ) : (
                <SignUpForm onSigningUp={handleSignUp} />
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NonClient;
