import React, { Component } from "react";
import { UserContext } from "../../context/UserContext";
import UserModel from "../../../models/UserModel";
import { UserService } from "../../../api/UserService";
import "./BoardUsers.css";
import { NotificationContext } from "../../context/NotificationContext";
import { Card, Image, Icon } from "semantic-ui-react";

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

      <Card key={user.username}>
        <Image src={user.photoUrl} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{user.firstname} {user.lastname}  </Card.Header>
          <Card.Meta>
            <label>email:</label>
            <span className='email'>{user.email} </span>
          </Card.Meta>
          <Card.Meta>
            <label>username:</label>
            <span className='username'>{user.username} </span>
          </Card.Meta>
          <Card.Description>
            Some description.
      </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='folder outline' />
            22 Projects
          </a>
        </Card.Content>
      </Card>
    );

    return (
      <div>
        <NotificationContext.Consumer>
          {
            ctx => {
              ctx.hub.onActiveUsers((users: UserModel[]) => this.setState({ users: users }));
              return <Card.Group>{usersList}</Card.Group>;
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