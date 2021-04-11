import React, { Component } from "react";
class LoginForm extends Component {
  state = { email: "", password: "" };

  onTrigger = (event) => {
    this.props.onLogging(this.state.email, this.state.password);
    event.preventDefault();
  };

  render() {
    return (
      <>
        <form className="loginUser" onSubmit={this.onTrigger}>
          <div className="loginForm">
            <div className="userEmailId">
              <label htmlFor="email">User Email</label>
              <br />
              <input
                name="email"
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
              <br />
              <input
                name="password"
                type="password"
                id="password"
                required
                minLength="7"
                onChange={(event) =>
                  this.setState({ password: event.target.value })
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

export default LoginForm;
