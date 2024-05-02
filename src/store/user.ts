import { defineStore } from 'pinia'
import { getToken,setToken } from '../utils/cookie'
import { doLogin,logout,getInfo } from "../api/user"
import {IUser} from '../models/User'
import { resolve } from 'path'
class User {
    token: string = ''
    roles: Array<any> = []
}
export const useUser = defineStore('user', {
    state() {
        return new User
        // return{
        //     token:'',
        //     roles:[]
        // }
    },
    actions: {
        Login(user: IUser) {
            return new Promise((resolve, reject) => {
                doLogin(user).then((res) => {
                    this.$patch({
                        token:res.data.data.token
                    })
                    console.log(res.data.data.token);
                    
                    setToken(res.data.data.token)
                    resolve(res)
                }).catch((error)=>{
                    reject(error)
                })
            })
        },
        Logout() {
         return new Promise((resolve,reject)=>{
            logout().then((res)=>{
                this.$patch({
                    token:'',
                    roles:[]
                })
                resolve(res)
            }).catch((error)=>{
                reject(error)
            })
         })
        },
        GetInfo(){
            return new Promise((resolve,reject)=>{
                getInfo(this.token).then((res)=>{
                    const {data}=res.data
                    if(!data){
                        reject("Verification failed, please Login again.");
                    }
                    this.$patch({
                        roles:data.roles
                    })
                    resolve(data)
                    console.log('roles',data);
                    
                }).catch((error)=>{
                    reject(error)
                })
            })
        }

    }
})