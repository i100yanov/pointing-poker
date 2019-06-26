import React, { Component } from "react";
import Board from "../board/Board";
import { Link } from "react-router-dom";
import { Header, Container, Button } from "semantic-ui-react";

export default class Homepage extends Component{
  render() {
    return (
      <Container>
        <Header>Homepage</Header> 
        
        <Button><Link to="/board">Board 1</Link></Button>
        <Button><Link to="/login">Logout</Link></Button>
      </Container>
      )
  }
}
interface IPorps {
}