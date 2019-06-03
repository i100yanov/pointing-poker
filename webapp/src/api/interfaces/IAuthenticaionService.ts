export interface IAuthenticationService {
   login(username:string, password: string): Promise<Response>;
}