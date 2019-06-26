import React from "react";
import { INotificationHubService } from "../../api/interfaces/INotificationHubService";
import { NotificationHubService } from "../../api/NotificationHubService";

const defaultUserContext : INotificationContext = { hub: new NotificationHubService() }
export const NotificationContext = React.createContext<INotificationContext>(defaultUserContext);
export interface INotificationContext {
    hub: INotificationHubService;
}