import React, { Component } from "react";
import "./Board.css";
import { UserContext } from "../context/UserContext";
import { Alert } from "react-bootstrap";
import UserModel from "../../models/UserModel";
import { UserService } from "../../api/UserService";
import Chat from "../chat/Chat";
import BoardUsers from "./users/BoardUsers";
import { Link } from "react-router-dom";

export default class Board extends Component<IProps, IState>{
  constructor(props: any) {
    super(props);

    this.state = {  };
  }

  componentDidMount(){
  }

  render() {
 
 
    return (
      
      <div className="Bord">
        <Alert  variant="primary">
        <Alert.Heading>Pointintg Poker Application</Alert.Heading>
          <b>Hello <UserContext.Consumer>
          { ctx => ctx.username }
        </UserContext.Consumer>
        </b>
        <div><Link to="/login">Logout</Link></div>
        </Alert>

        <div><h3>Active Users</h3></div>
        <BoardUsers />
        

        <div>
           <Chat username={ this.context.username }/>
        </div>
      </div>
    );
  }

}
Board.contextType = UserContext;

interface IState {
  users?: UserModel[]
}

interface IProps {
}