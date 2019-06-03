import React, { Component, FormEvent } from "react";
import "./CreateProfile.css";
import { Form, FormControlProps } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { ReplaceProps, BsPrefixProps } from "react-bootstrap/helpers";

export default class CreateProfile extends Component<IProps, IState>{

  constructor(props: IProps) {
    super(props);

    this.state = {
      username: "",
      firstName:"",
      lastName:"",
      email:"",
      confirmationPassword: "",
      password: ""
    };
  }

  render() {
    return (
        <div className="CreateProfile">
         <form onSubmit={ (e: any) =>  this.handleSubmit(e)}>

          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              required
              name="username"
              value={this.state.username}
              onChange={  (e:any) => this.handleChange(e) }
            />
            <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              name="password"
              value={this.state.password}
              onChange={  (e:any)  => this.handleChange(e) }
              type="password"
              isValid={ !!this.state.password  && this.state.password.length > 3 }
            />
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              required
              name="confirmationPassword"
              value={this.state.confirmationPassword}
              onChange={ (e:any)  => this.handleChange(e) }
              type="password"
              isValid={ !!this.state.password && this.state.confirmationPassword === this.state.confirmationPassword }
              
            />

             <Form.Control.Feedback type="invalid">
                Please choose a password.
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>First name</Form.Label>
            <Form.Control
              required
              name="firstName"
              value={this.state.firstName}
              onChange={  (e:any)  => this.handleChange(e) }
            />
            <Form.Control.Feedback type="invalid"> Please choose first name. </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              name="lastName"
              value={this.state.lastName}
              onChange={ (e:any)  => this.handleChange(e) }
            />
            <Form.Control.Feedback type="invalid"> Please choose last name. </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              name="email"
              value={this.state.email}
              onChange={ (e:any) => this.handleChange(e) }
              type='email'
            />
            <Form.Control.Feedback type="invalid"> Please choose email. </Form.Control.Feedback>
          </Form.Group>

          <Button
            block
            type="submit"
          >
            Sign up
          </Button>
        </form>
      </div>
    );
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement> | FormEvent<ReplaceProps<"input", BsPrefixProps<"input"> & FormControlProps>>): void {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (key && Object.keys(this.state).includes(key)) {
      this.setState({ [key]: value } as Pick<IState, keyof IState>);
    }
  } 
  
  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  }
}

interface IState {
    username: string,
    firstName:string,
    lastName:string,
    email:string,
    confirmationPassword: string,
    password: string,
}

interface IProps {
  history : string[];
 }