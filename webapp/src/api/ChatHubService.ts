import { IChatHubService } from "./interfaces/IChatHubService";
import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import UserModel from "../models/UserModel";

export class ChatHubService implements IChatHubService {

    private _connection: HubConnection;
    private _endpoint = 'http://localhost/poker/api/signalr/notification';

    constructor() {
        this._connection = this._connect();
        this.start();
    }

    _connect(): HubConnection {
        return this._connection = new HubConnectionBuilder()
            .withUrl(this._endpoint)
            .build();
    }

    start(): Promise<void> {
        return this._connection
            .start()
            .then(() => console.log('Connection started!'))
            .catch((err: any) => console.log('Error while establishing connection :('));
    }
    stop(): Promise<void> {
        return this._connection.stop().then(() => console.log('Connection stopped!'))
            .catch((err: any) => console.log('Error while stopping connection :('));
    }

    sendToAll(nick: string, message: string): Promise<Response> {
        return this._connection
            .invoke('sendToAll', nick, message)
            .catch((err: any) => console.error(err));
    }

    onSendToAll(callback : (nick: any, receivedMessage: any) => void ):void {
        this._connection.on('sendToAll', callback);
    }

    onActiveUsers(callback : (users: UserModel[]) => void ): void {
        this._connection.on('activeUsers', callback);
    }
}