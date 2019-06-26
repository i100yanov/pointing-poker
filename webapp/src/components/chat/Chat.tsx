import React, { Component } from 'react';
import { NotificationContext } from '../context/NotificationContext';
import { Form, Button, Message, Container, TextArea, Divider, Transition, Feed, Icon } from 'semantic-ui-react';

class Chat extends Component<IProps, IState> {
  private _isMounted = false;
  constructor(props: IProps) {
    super(props);

    this.state = {
      nick: '',
      message: '',
      messages: []
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    const nick = this.props.username;

    this.setState({ nick }, () => {

      if (this.context.hub) {
        this.context.hub.onSendToAll((nick: any, receivedMessage: any) => {
          if (this._isMounted) {
            const text = `${nick}: ${receivedMessage}`;
            if (this.state.messages) {
              const messages = this.state.messages.concat([text]);
              this.setState({ messages });
            }
          }
        });
      }
    });
  };

  sendMessage = () => {
    this.context.hub.sendToAll(this.state.nick, this.state.message);
    this.setState({ message: '' });

  };

  componentWillUnmount = () => {
    this._isMounted = false;

  }
  render() {
    const messages = this.state.messages || [];
    const messagesList = messages.map((message, index) =>
      <Feed.Event key={index}>
        <Feed.Label></Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User>
              {message.split(':')[0].trim()}
            </Feed.User>
            <Feed.Extra text>
              {message.split(':')[1].trim()}
            </Feed.Extra>
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>);

    return (
      <Container>

        <Form onSubmit={this.sendMessage}>
          <Form.Field>
            <label>Chat message</label>

            <TextArea
              required
              spellcheck
              placeholder='Write something to the logged poker players here.'
              value={this.state.message}
              onChange={(e: any) => this.setState({ message: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <Button type="submit">Send</Button>
          </Form.Field>
        </Form>

        <Feed>
          {messagesList}
        </Feed>

      </Container>
    );
  }
}
Chat.contextType = NotificationContext;

interface IProps {
  username: string;
}
interface IState {
  nick?: string | null,
  message?: string,
  messages?: string[]
}
export default Chat;