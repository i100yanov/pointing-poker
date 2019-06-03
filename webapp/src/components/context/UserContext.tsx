import React from "react";

const defaultUserContext : IUserContext = { username: '', token: '', authenticated: false }
export const UserContext = React.createContext<IUserContext>(defaultUserContext);
export interface IUserContext {
    username: string;
    token: string;
    authenticated: boolean
}