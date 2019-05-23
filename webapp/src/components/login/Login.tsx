import React, { Component } from "react";
import "./Login.css";
import { ChangeEvent } from "react";

export default class Login extends Component<IProps, IState>{
  constructor(props: any) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username</label>
            <input type="text" name="email" value={this.state.email} onChange={ (event) =>  this.handleChange(event) } placeholder="Username or Email"></input>
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={ (event) =>  this.handleChange(event) } placeholder="Password"></input>
          </div>

          <button disabled={false} type="submit"> Login </button>
        </form>
      </div>
    );
  }

  handleChange (e: React.ChangeEvent<HTMLInputElement>) {
    const key = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (Object.keys(this.state).includes(key)) {
      this.setState({[key]: value } as Pick<IState, keyof IState>);
    }
  }

  handleSubmit(){
  }
  
}

interface IState {
  email: string,
  password: string
}

interface IProps { }