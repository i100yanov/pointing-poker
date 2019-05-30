import React from "react";
import { string } from "prop-types";

const defaultUserContext : IUserContext = { username: '', token: ''}
export const UserContext = React.createContext<IUserContext>(defaultUserContext);
export interface IUserContext {
    username: string;
    token: string;
}