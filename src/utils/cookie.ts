import Cookies from 'js-cookie'
export const tokenKey='Admin-Token'

export function setToken (token:String){
    return Cookies.set(tokenKey,token)
}
export function getToken(){
    return Cookies.get(tokenKey)
}
export function removeToken(){
    return Cookies.remove(tokenKey)
}