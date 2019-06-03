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
        <h1>HELLO</h1>
        <h2> 
        <UserContext.Consumer>
          { ctx => ctx.username }
        </UserContext.Consumer>
      </h2> 
      </div>
    );
  }

}
Board.contextType = UserContext;

interface IState {
}

interface IProps { }