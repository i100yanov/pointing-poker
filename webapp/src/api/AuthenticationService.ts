import { IAuthenticationService } from "./interfaces/IAuthenticaionService";

export class AuthenticationService implements IAuthenticationService {
    login(username: string, password: string): Promise<string> {

        let data = { username, password };

        const endpointUrl = 'http://localhost/poker/api/authentication/login';
        const requestInit: RequestInit = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        };

        return fetch(endpointUrl, requestInit)
            .then((response) => response.text());
    }
 
    logout(token: string, reason: string): Promise<Response> {

        const data = { reason };
        const endpointUrl = 'http://localhost/poker/api/authentication/logout';
        const requestInit : RequestInit = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json',
                'Authorization': 'Bearer ' + token,
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            }
        };

        return fetch(endpointUrl, requestInit);
    }
}
