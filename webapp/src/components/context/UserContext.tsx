import React from "react";

const defaultUserContext : IUserContext = { username: '', token: ''}
export const UserContext = React.createContext<IUserContext>(defaultUserContext);
export interface IUserContext {
    username: string;
    token: string;
}