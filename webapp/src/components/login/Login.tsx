import React, { Component } from "react";
import "./Login.css";
import { ChangeEvent } from "react";
import { AuthenticationService } from "../../services/AuthenticationService";
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

export default class Login extends Component<IProps, IState>{
  constructor(props: IProps) {
    super(props);

    this.state = {
      username: "",
      password: "",
      message: ""
    };
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div>
            <label>Username</label>
            <input type="text" name="username" value={this.state.username} onChange={(event) => this.handleChange(event)} placeholder="Username or Email"></input>
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={(event) => this.handleChange(event)} placeholder="Password"></input>
          </div>

          <button disabled={false} type="submit"> Login </button>
          <div>{this.state.message}</div>
        </form>
        <Link to="/profile/create">Sign Up</Link>
        <Link to="/board">Board</Link>

      </div>
    );
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (Object.keys(this.state).includes(key)) {
      this.setState({ [key]: value } as Pick<IState, keyof IState>);
    }
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // validate form
    e.preventDefault();
    const authenticationService = new AuthenticationService();
    authenticationService
      .login(this.state.username, this.state.password)
      .then(
        (response) =>
          response.text())
      .then(
        (text) =>
          this.onLoginSuccess(this.state.username, text))
      .catch((error) =>
        this.onLoginFailed(this.state.username, error.toString())
      );
  }

  onLoginFailed(username: string, error: string) {
    this.setState({ message: "Login of " + this.state.username + " failed with error: " + error });
  }

  onLoginSuccess(username: string, token: string) {
    if (token && token.length > 0) {
      this.setState({ message: "Login of " + this.state.username + " was successful." });
      this.context.username = username;
      this.context.token = token;
      this.props.history.push("/board");
    }
    else {
      this.onLoginFailed(this.state.username, "Login failed - username and password does not match.")
    }
  }
}
Login.contextType = UserContext;

interface IState {
  username: string,
  password: string,
  message: string;
}

interface IProps {
  history : string[];
 }