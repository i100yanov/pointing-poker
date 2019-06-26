import React, { Component } from "react";
import "./Board.css";
import { UserContext } from "../context/UserContext";
import UserModel from "../../models/UserModel";
import Chat from "../chat/Chat";
import BoardUsers from "./users/BoardUsers";
import { Link } from "react-router-dom";
import { Header, Container, Segment, Button } from "semantic-ui-react";

export default class Board extends Component<IProps, IState>{
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
  }

  render() {


    return (

      <Container className="Bord">
        <div>
          <Header>Pointintg Poker Application</Header>
          <b>Hello <UserContext.Consumer>
            {ctx => ctx.username}
          </UserContext.Consumer>
          </b>
          <Button><Link to="/login">Logout</Link></Button>
        </div>

        <Segment>
          <Header>Active Users</Header>
          <BoardUsers />
        </Segment>

        <Segment>
          <Chat username={this.context.username} />
        </Segment>
      </Container>
    );
  }

}
Board.contextType = UserContext;

interface IState {
  users?: UserModel[]
}

interface IProps {
}