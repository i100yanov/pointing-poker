import React, { Component } from 'react';
import { NotificationContext } from '../context/NotificationContext';

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
    return (
      <div>
        <br />
        <input
          type="text"
          value={this.state.message}
          onChange={e => this.setState({ message: e.target.value })}
        />

        <button onClick={this.sendMessage}>Send</button>

        <div>
          {messages.map((message: any, index: any) => (
            <span style={{ display: 'block' }} key={index}> {message} </span>
          ))}
        </div>
      </div>
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