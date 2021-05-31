import React, { Component } from "react";
import axios from "axios";
class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    forgetPassFlag: false,
    forgetEmail: "",
    setNewPasswordFlag: false,
    confirmPassword: "",
    newPassword: "",
    user: {},
  };

  onTrigger = (event) => {
    this.props.onLogging(this.state.email, this.state.password);
    event.preventDefault();
  };

  handleForgetPassword = () => {
    this.setState({ forgetPassFlag: true });
  };

  handleSendOTP = async () => {
    let email = this.state.forgetEmail;
    try {
      const api = axios.create({
        baseURL: `https://immense-sands-26614.herokuapp.com`,
      });
      const usersResponse = await api.get("/");
      let users = await usersResponse.data;
      const user = users.find((user) => {
        return user.email == email;
      });
      if (!user) {
        alert(
          "No user is registerd with this email. Sign Up to create new account"
        );
      } else {
        let val = Math.floor(1000 + Math.random() * 9000);
        Email.send({
          Host: "smtp.elasticemail.com",
          Username: "aarthiak2103@gmail.com",
          Password: "F29B7D6C95D43CB05A75BFA76778D63C1DC4",
          To: email,
          From: "aarthiak2103@gmail.com",
          Subject: "Book A Tick- OTP",
          Body: "<html><span>Your OTP is " + val + "</span></html>",
        }).then((message) => console.log());
        let otp = parseInt(prompt("Enter the OTP Sent to the Email"));
        if (otp == val) {
          this.setState({
            user: user,
            forgetPassFlag: false,
            forgetEmail: "",
            setNewPasswordFlag: true,
          });
        } else {
          alert("OTP doesnt match!!");
          this.setState({ forgetPassFlag: false, forgetEmail: "" });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  handlePasswordSetting = async () => {
    if (this.state.confirmPassword !== this.state.newPassword) {
      alert("Password donot match");
    } else {
      let user = this.state.user;
      user.password = this.state.newPassword;
      try {
        const api = axios.create({
          baseURL: `https://immense-sands-26614.herokuapp.com`,
        });
        const user = await api.post("/", user).data;
        this.setState({
          email: "",
          password: "",
          forgetPassFlag: false,
          forgetEmail: "",
          setNewPasswordFlag: false,
          confirmPassword: "",
          newPassword: "",
          user: {},
        });
        alert("Password Changed Successfully");
      } catch (err) {
        console.log("err");
      }
    }
  };

  render() {
    return (
      <>
        <div className="row loginForm">
          <form className="col-12 loginUser" onSubmit={this.onTrigger}>
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
            <div className="row">
              <div className="col-6 col-sm-5 col-md-5 col-lg-5">
                <button
                  className="btn btn-success btn-outline-light btn-lg"
                  type="submit"
                  data-toggle="button"
                  aria-pressed="false"
                  autoComplete="off"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          <div
            className="col-12"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "15px",
            }}
          >
            <div className="row">
              <button
                className="col-12  btn btn-danger btn-outline-light btn-lg btn-block"
                data-toggle="button"
                aria-pressed="false"
                autoComplete="off"
                onClick={() => this.handleForgetPassword()}
              >
                Forget Password?
              </button>
            </div>
          </div>
          <br></br>
          {this.state.forgetPassFlag === true ? (
            <>
              <div className="row forgetPass">
                <div className="col-6">
                  <label>Enter email Address</label>
                </div>
                <div className="col-6">
                  <input
                    name="email"
                    type="email"
                    id="email"
                    placeholder="example@mail.com"
                    required
                    onChange={(event) =>
                      this.setState({ forgetEmail: event.target.value })
                    }
                  />
                </div>
                <button
                  className=" btn btn-info btn-outline-light "
                  data-toggle="button"
                  aria-pressed="false"
                  autoComplete="off"
                  onClick={() => this.handleSendOTP()}
                  style={{ marginTop: "15px" }}
                >
                  Send OTP to Mail
                </button>
              </div>
              <br></br>
            </>
          ) : this.state.setNewPasswordFlag == true ? (
            <>
              <div className="row">
                <div className="col-6">Enter New Password: </div>
                <div className="col-6">
                  <input
                    name="newPass"
                    type="password"
                    id="newPass"
                    required
                    onChange={(event) =>
                      this.setState({ newPassword: event.target.value })
                    }
                  />
                </div>
              </div>
              <br></br>
              <div className="row">
                <div className="col-6">Confirm New Password: </div>
                <div className="col-6">
                  <input
                    name="confirmPass"
                    type="password"
                    id="confirmPass"
                    required
                    onChange={(event) =>
                      this.setState({ confirmPassword: event.target.value })
                    }
                  />
                </div>
              </div>
              <br></br>
              <button
                className=" btn btn-info btn-outline-light"
                data-toggle="button"
                aria-pressed="false"
                autoComplete="off"
                onClick={() => this.handlePasswordSetting()}
              >
                Confirm
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default LoginForm;
