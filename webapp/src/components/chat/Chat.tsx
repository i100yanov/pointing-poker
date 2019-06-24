import React, { Component } from 'react';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';

class Chat extends Component<IProps, IState> {
  private _isMounted = false;
  constructor(props: IProps) {
    super(props);

    this.state = {
      nick: '',
      message: '',
      messages: [],
      hubConnection: undefined,
    };
  }

  componentDidMount = () => {
    this._isMounted = true;
    const nick = this.props.username;

    const hubConnection: HubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost/poker/api/signalr/chat')
      .build();

    this.setState({ nick, hubConnection }, () => {

      if (this.state.hubConnection) {
        this.state.hubConnection
          .start()
          .then(() => console.log('Connection started!'))
          .catch((err: any) => console.log('Error while establishing connection :('));

        this.state.hubConnection.on('sendToAll', (nick: any, receivedMessage: any) => {
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
    if (this.state.hubConnection) {
      this.state.hubConnection
        .invoke('sendToAll', this.state.nick, this.state.message)
        .catch((err: any) => console.error(err));

      this.setState({ message: '' });
    }
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

interface IProps {
  username: string;
}
interface IState {
  nick?: string | null,
  message?: string,
  messages?: string[],
  hubConnection?: HubConnection
}
export default Chat;