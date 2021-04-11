import React, { Component } from "react";
class SignUpForm extends Component {
  state = {
    email: "",
    password: "",
    username: "",
    phoneNumber: "",
    role: "client",
  };
  onTrigger = (event) => {
    this.props.onSigningUp(
      this.state.email,
      this.state.password,
      this.state.username,
      this.state.phoneNumber,
      this.state.role
    );
    event.preventDefault();
  };
  render() {
    return (
      <>
        <form className="signUp" onSubmit={this.onTrigger}>
          <div className="signUpForm">
            <div className="userEmailId">
              <label htmlFor="email">User Email</label>
              <input
                type="email"
                id="email"
                placeholder="example@mail.com"
                required
                onChange={(event) =>
                  this.setState({ email: event.target.value })
                }
              />
            </div>
            <div className="userPassword">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                required
                minLength="7"
                onChange={(event) =>
                  this.setState({ password: event.target.value })
                }
              />
            </div>
            <div className="username">
              <label htmlFor="username">User Name</label>
              <input
                type="text"
                id="username"
                required
                onChange={(event) =>
                  this.setState({ username: event.target.value })
                }
              />
            </div>
            <div className="phone Number">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="text"
                id="phoneNumber"
                required
                minLength="10"
                maxLength="10"
                onChange={(event) =>
                  this.setState({ phoneNumber: event.target.value })
                }
              />
            </div>
            <button type="submit">Login</button>
          </div>
        </form>
      </>
    );
  }
}

export default SignUpForm;
