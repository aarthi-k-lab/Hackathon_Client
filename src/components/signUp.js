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
        <form className="signUp container-fluid" onSubmit={this.onTrigger}>
          <div className="signUpForm container-fluid">
            <div className="userEmailId row">
              <div className="col-6">
                <label htmlFor="email">User Email</label>
              </div>
              <div className="col-6">
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
            </div>
            <br></br>
            <div className="userPassword row">
              <div className="col-6">
                <label htmlFor="password">Password</label>
              </div>
              <div className="col-6">
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
            </div>
            <br></br>
            <div className="username row">
              <div className="col-6">
                <label htmlFor="username">User Name</label>
              </div>
              <div className="col-6">
                <input
                  type="text"
                  id="username"
                  required
                  onChange={(event) =>
                    this.setState({ username: event.target.value })
                  }
                />
              </div>
            </div>
            <br></br>
            <div className="phone Number row">
              <div className="col-6">
                <label htmlFor="phoneNumber">Phone Number</label>
              </div>
              <div className="col-6">
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
            </div>
            <br></br>
            <button
              className="btn btn-info btn-outline-light btn-lg"
              data-toggle="button"
              aria-pressed="false"
              autocomplete="off"
              type="submit"
            >
              Create an account
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default SignUpForm;
