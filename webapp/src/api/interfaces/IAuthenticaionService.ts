export interface IAuthenticationService {
   login(username:string, password: string): Promise<Response>;
   logout(token: string, reason: string): Promise<Response>;
}