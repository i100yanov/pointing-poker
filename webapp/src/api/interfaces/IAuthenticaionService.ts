export interface IAuthenticationService {
   login(username:string, password: string): Promise<string>;
   logout(token: string, reason: string): Promise<Response>;
}