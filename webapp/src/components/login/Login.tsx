import React, { Component } from "react";
import "./Login.css";
import { AuthenticationService } from "../../api/AuthenticationService";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { Form, Button, Message, Container, Divider, Segment, Responsive, Transition } from "semantic-ui-react"
export default class Login extends Component<IProps, IState>{
  constructor(props: IProps) {
    super(props);

    this.state = {
      username: "",
      password: "",
      message: "",
    };
  }

  componentWillMount() {
    if (this.context.authenticated) {
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
      <Container className="Login">
        <Segment.Group>
          <Segment padded='very' color='blue'>
            <Form
              onSubmit={(e: any) => this.handleSubmit(e)}>

              <Form.Field>
                <label>Username</label>
                <input
                  autoFocus
                  required
                  name="username"
                  value={this.state.username}
                  onChange={(e: any) => this.handleChange(e)}
                />
              </Form.Field>

              <Form.Field>
                <label>Password</label>
                <input
                  required
                  name="password"
                  value={this.state.password}
                  onChange={(e: any) => this.handleChange(e)}
                  type="password"
                />
              </Form.Field>
              <Form.Field>
              <Button
                type="submit">
                Login
             </Button>
              <Button type="submit">
                <Link to="/profile/create">Sign Up</Link>
              </Button>
              </Form.Field>
            </Form>
          </Segment>
        </Segment.Group>
        <Transition visible={!!this.state.message } animation='scale' duration={500}>
          <Message content={this.state.message} error></Message>
        </Transition>
      </Container>
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
      .then((response: Response) => response.text())
      .then((text) => this.onLoginSuccess(this.state.username, JSON.parse(text)))
      .catch((error) => this.onLoginFailed(this.state.username, error.toString())
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
  message?: string;
}

interface IProps {
  history: string[];
}