export interface IUserService {
   register(token: string, username:string, password: string, email:string, firstname:string, lastname:string): Promise<Response>;
}