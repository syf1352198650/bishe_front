
import {request} from '@/utils/request'
import { IUser,isLoginData } from '@/models/User';
import { IResData } from '@/models/ResponseData';
import { AxiosPromise } from 'axios';
export const uploadFiles=(files:any)=>{
  return request({
    url:'/user/file',
    method:'post',
    data:files,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const doLogin=(user:IUser):AxiosPromise<IResData<isLoginData>>=>{
    return request({
        url:'user/login',
        method:'post',
        data:user
    })
}
export function logout () {  // 退出
    return request({
      url:'user/logout',
      method:'post',
    })
  }
  export function getInfo(token:string){
    return request({
        url:'user/info',
        method:'get',
        params:{token}
      })
  }
  
export function loanCreate (data:any) { // 贷款申请
  return request ({
    url:'loan/create',
    method:'post',
    data
  })
}
export function loanList (data:any) { // 申请管理 -- 查询
  return request ({
    url:'loan/list',
    method:'get',
    params:data
  })
}
export function loanUpdate (data:any) { // 申请管理 -- 编辑
  return request ({
    url:'loan/update',
    method:'put',
    data
  })
}
export function loanDelete (data:any) { // 申请管理 -- 删除
  return request ({
    url:'loan/delete/'+data.id,
    method:'delete',
  })
}

export function loanSubmitToApprove (data:any) { // 申请管理 -- 删除
  return request ({
    url:'loan/submitToApprove',
    method:'post',
    data
  })
}

export function approveFirstList (data:any) { // 贷款审批-初审-查询
  return request ({
    url:'approve/first/list',
    method:'get',
    params:data
  })
}

export function loanQuery (data:any) { // 贷款审批 -初审-查看详情
  return request ({
    url:'loan/query',
    method:'get',
    params:data
  })
}

export function approveFirstPass (data:any) { // 贷款审批 -初审-通过
  return request ({
    url:'approve/first/pass',
    method:'post',
    data
  })
}

export function approveFirstReject (data:any) { // 贷款审批 -初审-拒绝
  return request ({
    url:'approve/first/reject',
    method:'post',
    data
  })
}

export function approveEndList (data:any) { // 贷款审批 -终审-查询
  return request ({
    url:'approve/end/list',
    method:'get',
    params:data
  })
}

export function loanEndQuery (data:any) { // 贷款审批 -终审-查看详情
  return request ({
    url:'loan/query',
    method:'get',
    params:data
  })
}

export function approveEndPass (data:any) { // 贷款审批 -终审-通过
  return request ({
    url:'approve/end/pass',
    method:'post',
    data
  })
}

export function approveEndReject (data:any) { // 贷款审批 -终审-拒绝
  return request ({
    url:'approve/end/reject',
    method:'post',
    data
  })
}

export function contractList (data:any) { // 标的管理 -查询
  return request ({
    url:'contract/list',
    method:'get',
    params:data
  })
}

export function contractCreateFile (data:any) { // 标的管理 -生成合同
  return request ({
    url:'contract/createFile',
    method:'post',
    data
  })
}

export function contractDownload (data:any) { // 标的管理 -下载合同
  return request ({
    url:'contract/download',
    method:'get',
    params:data
  })
}

export function permissionCreateUser (data:any) { // 权限管理 -创建管理员
  return request ({
    url:'permission/createUser',
    method:'post',
    data
  })
}

export function permissionUserlist () { // 权限管理 -列表展示
  return request ({
    url:'user/list',
    method:'get',
  })
}
export function mergeFiles(data:any){
  return request({
    url:'loan/mergeFiles',
    method:'post',
    data
  })
}
