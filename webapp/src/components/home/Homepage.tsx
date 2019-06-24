import React, { Component } from "react";
import Board from "../board/Board";
import { Link } from "react-router-dom";

export default class Homepage extends Component{
  render() {
    return (
      <div>
        <h1>Homepage</h1> 
        <div><Link to="/board">Board 1</Link></div>
        <div><Link to="/login">Logout</Link></div>
      </div>
      )
  }
}
interface IPorps {
}