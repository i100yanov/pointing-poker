import React, { Component } from "react";
import "./Board.css";
import { UserContext } from "../context/UserContext";
import { Alert } from "react-bootstrap";
import UserModel from "../../models/UserModel";
import { UserService } from "../../api/UserService";
import Chat from "../chat/Chat";

export default class Board extends Component<IProps, IState>{
  constructor(props: any) {
    super(props);

    this.state = {  };
  }

  componentDidMount(){
    const userService = new UserService();
    userService
        .getAll(this.context.token)
        .then((response: Response) => {
          if (response.status === 200) {
             response.json().then(data => 
              this.setState({users: data}))
          } else {
              response.text().then( errors => console.log(errors));
          }
          return response;
      })
      .catch((error) =>
          console.log(error.toString())
      );
  }

  render() {
    const users = this.state.users || [];
    const usersList =  users.map((user) =>
    <li key={user.username}>
      {user.username} - {user.email}
    </li>
  );;

    
    
    return (
      
      <div className="Bord">
        <Alert  variant="primary">
        <Alert.Heading>Pointintg Poker Application</Alert.Heading>
          <b>Hello <UserContext.Consumer>
          { ctx => ctx.username }
        </UserContext.Consumer>
        </b>
        </Alert>

        <div><h3>All Users</h3></div>
        <ul>{ usersList }</ul>
        

        <div>
           <Chat username={ this.context.username } />
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