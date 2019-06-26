import UserModel from "../../models/UserModel";
export interface INotificationHubService {
    sendToAll(nick: string, message: string): Promise<Response>;
    start(): Promise<void>;
    stop(): Promise<void>;
    onSendToAll(callback: (nick: any, receivedMessage: any) => void): void;
    onActiveUsers(callback: (users: UserModel[]) => void): void;
}
