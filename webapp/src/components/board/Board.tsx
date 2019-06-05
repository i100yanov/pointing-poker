import React, { Component } from "react";
import "./Board.css";
import { UserContext } from "../context/UserContext";
import { Alert } from "react-bootstrap";
import UserModel from "../../models/UserModel";
import { UserService } from "../../api/UserService";
export default class Board extends Component<IProps, IState>{
  constructor(props: any) {
    super(props);

    this.state = {  };
  }

  render() {

    const userService = new UserService();
    userService
        .get(this.context.token, this.context.username)
        .then((response: Response) => {
          if (response.status === 200) {
             response.json().then(data => this.setState({user: data}))
          } else {
              response.text().then( errors => console.log(errors));
          }
          return response;
      })
      .catch((error) =>
          console.log(error.toString())
      );
    return (
      
      <div className="Bord">
        <Alert  variant="primary">
        <Alert.Heading>Pointintg Poker Application</Alert.Heading>
          <b>Hello <UserContext.Consumer>
          { ctx => ctx.username }
        </UserContext.Consumer>
        </b>
        </Alert>

        <div>{ this.state.user }</div>
      </div>
    );
  }

}
Board.contextType = UserContext;

interface IState {
  user?: UserModel
}

interface IProps { }