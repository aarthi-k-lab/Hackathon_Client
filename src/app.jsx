import React, { Component } from "react";
import NonClient from "./components/nonClient.js";
import Client from "./components/client.js";
import "./stylesheet/style.css";
class App extends Component {
  state = {
    user: {},
    userFlag: false,
  };

  handleLogin = async (emailId, password) => {
    let mockapiurl = "http://localhost:3200/";
    try {
      const usersResponse = await fetch(mockapiurl);
      let users = await usersResponse.json();
      const user = users.find((user) => {
        return user.email == emailId && user.password == password;
      });
      if (!user) {
        alert("Please check username or password");
      } else {
        this.setState({ user });
        this.setState({ userFlag: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleSignUp = async (emailId, pass, userName, phone, role) => {
    let mockapiurl = "http://localhost:3200/";
    const user = {
      email: emailId,
      password: pass,
      username: userName,
      phoneNumber: phone,
      role: role,
    };
    try {
      const userResponse = await fetch(mockapiurl, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-type": "application/json;characterset=UTF-8" },
      });
      let user = await userResponse.json();
      if (user.name == "MongoError") {
        alert(
          "Only unique emilid must be used and phone numer should be in correct format"
        );
      }
      this.setState({ user });
      this.setState({ userFlag: true });
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
