import React, { Component } from "react";
import "./Board.css";
import { UserContext } from "../context/UserContext";
export default class Board extends Component<IProps, IState>{
  constructor(props: any) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      
      <div className="Bord">
        HELLO 
      <UserContext.Consumer>
         { value => value.username }
      </UserContext.Consumer>
      </div>
    );
  }

}
Board.contextType = UserContext;

interface IState {
}

interface IProps { }