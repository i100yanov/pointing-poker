import React from "react";
import { IChatHubService } from "../../api/interfaces/IChatHubService";
import { ChatHubService } from "../../api/ChatHubService";

const defaultUserContext : INotificationContext = { hub: new ChatHubService() }
export const NotificationContext = React.createContext<INotificationContext>(defaultUserContext);
export interface INotificationContext {
    hub: IChatHubService;
}