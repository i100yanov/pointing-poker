import { IUserService } from "./interfaces/IUserService";
import handleErrors from "../utils/handleErrors";

export class UserService implements IUserService {
    register(token: string, username: string, password: string, email:string, firstname:string, lastname:string): Promise<Response> {

        let data = { username, password, email, firstname, lastname };

        const endpointUrl = 'http://localhost/poker/api/user/register';
        const requestInit : RequestInit = {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        };

        return fetch(endpointUrl, requestInit)
                .then((response: Response) => handleErrors(response));
    }
 
    get(token: string, username: string): Promise<Response> {

        const endpointUrl = 'http://localhost/poker/api/user/' + username;
        const requestInit : RequestInit = {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };

        return fetch(endpointUrl, requestInit)
        .then((response: Response) => handleErrors(response));
    }

    getAll(token: string): Promise<Response> {

        const endpointUrl = 'http://localhost/poker/api/user';
        const requestInit : RequestInit = {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };

        return fetch(endpointUrl, requestInit)
        .then((response: Response) => handleErrors(response));
    }

    getAllActive(token: string): Promise<Response> {
        const endpointUrl = 'http://localhost/poker/api/user/active';
        const requestInit : RequestInit = {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'Authorization': 'Bearer ' + token
            }
        };

        return fetch(endpointUrl, requestInit)
        .then((response: Response) => handleErrors(response));
    }
}
