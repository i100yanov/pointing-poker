import React, { Component } from "react";
import "./Login.css";
import { AuthenticationService } from "../../api/AuthenticationService";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default class Login extends Component<IProps, IState>{
  constructor(props: IProps) {
    super(props);

    this.state = {
      username: "",
      password: "",
      message: "",
    };
  }

  componentWillMount(){
    if (this.context.authenticated){
      const authenticationService = new AuthenticationService();
      authenticationService
        .logout(this.context.token, 'Manual logout.')
        .then(() => {
          this.context.token = null;
          this.context.username = null;
          this.context.authenticated = null;
        }
        )
        .catch(
          () => {
            this.context.token = null;
            this.context.username = null;
            this.context.authenticated = null;
          }
        );
      }
  }

  render() {
    return (
      <div className="Login">

        <Form 
            onSubmit={ (e: any) => this.handleSubmit(e)}>

          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              required
              name="username"
              value={this.state.username}
              onChange={  (e:any) => this.handleChange(e) }
              isValid={ !!this.state.username }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              name="password"
              value={this.state.password}
              onChange={  (e:any)  => this.handleChange(e) }
              type="password"
              isValid={ !!this.state.password }
              autoComplete="off"
            />
      </Form.Group>

        <Button
            block
            type="submit">
            Login
          </Button>
      </Form>
      <Link to="/profile/create">Sign Up</Link>
      <h3>{this.state.message}</h3>
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
        (text) =>
          this.onLoginSuccess(this.state.username, JSON.parse(text)))
      .catch((error) =>
        this.onLoginFailed(this.state.username, error.toString())
      );
  }

  onLoginFailed(username: string, error: string) {
    this.setState({ message: "Login of " + this.state.username + " failed with error: " + error });
    this.context.username = '';
    this.context.token = '';
    this.context.authenticated = false;
  }

  onLoginSuccess(username: string, token: string) {
    if (token && token.length > 0) {
      this.setState({ message: "Login of " + this.state.username + " was successful." });
      this.context.username = username;
      this.context.token = token;
      this.context.authenticated = true;
      this.props.history.push("/");
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