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
        <form className="container-fluid loginUser" onSubmit={this.onTrigger}>
          <div className="container-fluid loginForm">
            <div className="row">
              <div className="userEmailId col-6">
                <label htmlFor="email">User Email</label>
              </div>

              <div className="col-6">
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
            </div>
            <br></br>
            <div className="row">
              <div className=" userPassword col-6">
                <label htmlFor="password">Password</label>
              </div>
              <div className="col-6">
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
            </div>
            <br></br>
            <button
              className="btn btn-info btn-outline-light btn-lg"
              type="submit"
              data-toggle="button"
              aria-pressed="false"
              autocomplete="off"
            >
              Login
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default LoginForm;
