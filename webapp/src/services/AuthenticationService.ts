import { IAuthenticationService } from "./interfaces/IAuthenticaionService";
export class AuthenticationService implements IAuthenticationService {
    login(username: string, password: string): Promise<Response> {

        let data = { username, password };

        const endpointUrl = 'http://localhost/poker/api/authentication/login';
        const requestInit : RequestInit = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            //mode: 'no-cors', // no-cors, cors, *same-origin
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Accept' : 'application/json',
                'Content-type' : 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        };

        return fetch(endpointUrl, requestInit);
    }
}
