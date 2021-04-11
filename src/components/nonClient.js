import React, { Component } from "react";
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
        <div className="LoginHeader">
          <h1 id="appName">Book-a-Tick</h1>
          <button
            className="btn btn-primary"
            onClick={() => this.setState({ login: true })}
          >
            Login
          </button>
          <button
            className="btn btn-primary"
            onClick={() => this.setState({ login: false })}
          >
            Sign Up
          </button>
        </div>
        {this.state.login === true ? (
          <LoginForm onLogging={handleLogin} />
        ) : (
          <SignUpForm onSigningUp={handleSignUp} />
        )}
      </>
    );
  }
}

export default NonClient;
