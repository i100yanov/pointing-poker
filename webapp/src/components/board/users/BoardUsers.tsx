import React, { Component } from "react";
import { UserContext } from "../../context/UserContext";
import UserModel from "../../../models/UserModel";
import { UserService } from "../../../api/UserService";
import "./BoardUsers.css";
import { NotificationContext } from "../../context/NotificationContext";

export default class BoardUsers extends Component<IProps, IState>{
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const userService = new UserService();
    userService
      .getAllActive(this.context.token)
      .then((response: Response) => {
        if (response.status === 200) {
          response.json().then(data =>
            this.setState({ users: data }))
        } else {
          response.text().then(errors => console.log(errors));
        }
        return response;
      })
      .catch((error) =>
        console.log(error.toString())
      );

    if (this.context.hub) {
      this.context.hub.onActiveUsers((users: UserModel[]) => {
        this.setState({ users: users });
      });
    }
  }

  render() {
    const users = this.state.users || [];
    const usersList = users.map((user) =>
    <li key={user.username}>
    {user.username} - {user.email}
    </li>
    );

    return (
      <div>
        <NotificationContext.Consumer>
        {
         ctx =>  { 
                ctx.hub.onActiveUsers((users: UserModel[]) =>  this.setState({ users: users })); 
                return <ul>{usersList}</ul>;
          }
        }
      </NotificationContext.Consumer>
      </div>
    );
  }

}
BoardUsers.contextType = UserContext;

interface IState {
  users?: UserModel[]
}

interface IProps {
}