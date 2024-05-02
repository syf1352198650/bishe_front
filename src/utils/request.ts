import  Axios,{AxiosResponse}  from "axios";
import {setToken,getToken} from './cookie'
import {IResData} from '../models/ResponseData'
import {ElMessage } from 'element-plus'
export const request = Axios.create({
    baseURL: "/api",
  withCredentials: true, // 允许携带coolie
})

request.interceptors.request.use((config)=>{
    const token = getToken()
    if(token){
        (config.headers as any).token=token;
    }
    return config
})
const TOKEN_EXPIRES = 603;
request.interceptors.response.use((response:AxiosResponse<IResData>)=>{
    // const res:IResData=response.data
    // console.log(response,'sdsdsds');
    
    if(response.data.code!==20000){
        ElMessage({
            message:response.data.data||"服务器错误",
            type:'error',
            duration:2000
        }) 
        if (response.data.code === TOKEN_EXPIRES) {
            (window.location as any) = '/#/login';
            window.location.reload();
            return          
         }
    }
    else {
        return (response as any);
      }
   
    
      return Promise.reject(new Error(response.data.data || "Error"));
},
(error)=>{
    console.log("error"+error);
    ElMessage({
        message: error.message,
        type: "error",
        duration: 2000,
      });
      return Promise.reject(error);

// return response
})