export interface IUser{
    account:string,
    password:string
}
export interface isLoginData{
    token:string
}
export class User implements IUser{
    account: string='admin'
    password:string='approve123456.'
}