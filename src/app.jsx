import React, { Component } from "react";
import axios from "axios";
import NonClient from "./components/nonClient.js";
import Client from "./components/client.js";
import "./stylesheet/style.css";
class App extends Component {
  state = {
    user: {},
    userFlag: false,
  };

  handleLogin = async (emailId, password) => {
    try {
      const api = axios.create({
        baseURL: `http://immense-sands-26614.herokuapp.com`,
      });
      const usersResponse = await api.get("/");
      let users = await usersResponse.data;
      const user = users.find((user) => {
        return user.email == emailId && user.password == password;
      });
      if (!user) {
        alert("Please check username or password");
      } else {
        this.setState({ user });
        this.setState({ userFlag: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleSignUp = async (emailId, pass, userName, phone, role) => {
    const newuser = {
      email: emailId,
      password: pass,
      username: userName,
      phoneNumber: phone,
      role: role,
    };
    const mockapiurl = "http://immense-sands-26614.herokuapp.com";
    try {
      const userResponse = await fetch(mockapiurl, {
        method: "POST",
        body: JSON.stringify(newuser),
        headers: { "Content-type": "application/json;characterset=UTF-8" },
      });
      let user = await userResponse.json();
      console.log(user);
      if (user.name == "MongoError") {
        alert(
          "Only unique emilid must be used and phone numer should be in correct format"
        );
      } else {
        this.setState({ user });
        this.setState({ userFlag: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleLogOut = () => {
    const user = {};
    this.setState({ user });
    this.setState({ userFlag: false });
  };
  render() {
    return (
      <>
        {this.state.userFlag == false ? (
          <NonClient
            handleLogin={this.handleLogin}
            handleSignUp={this.handleSignUp}
          />
        ) : (
          <Client user={this.state.user} onLogOut={this.handleLogOut} />
        )}
      </>
    );
  }
}

export default App;
