import { type } from "os"

export const getSex = (data: any) => {
    switch (data) {
        case 'man': return '男'
        case 'woman': return '女'
        case 'women':
            return '女'
        default: return data
    }
}

export const getEducation = (data: any) => {
    switch (data) {
        case 'college': return '大学'
        case 'highschool': return '高中'
        default: return data

    }
}


export const statusTypeFilter = (data: any) => {
    // console.log("sdddddddddddd");

    switch (data) {
        case 0:
            return 'success'
        case 1:
            return ''
        case 2:
            return 'success'
        case 3:
            return 'danger'
        case 4:
            return 'warning'
        case 5:
            return 'success'
        case 6:
            return 'danger'
        case 7:
            return 'success'
    }
}
export const statusFilter = (data: any) => {
    switch (data) {
        case 0:
            return '进件状态'
        case 1:
            return '提交初审'
        case 2:
            return '初审通过'
        case 3:
            return '初审拒绝'
        case 4:
            return '提交终审'
        case 5:
            return '终审通过'
        case 6:
            return '终审拒绝'
        case 7:
            return '生成合同'
        default:
            return data
    }
}
export const getBirday = (data: any) => {
    let myDate = new Date(data)
    let year = myDate.getFullYear()
    let month = myDate.getMonth() + 1
    let date = myDate.getDate()
    function conver(s: any) {
        return s < 10 ? '0' + s : s
    }
    let dates = year + '-' + conver(month) + '-' + conver(date)
    // console.log(data);

    // console.log(new Date(2022-03-31T16:00:00.000Z));

    return dates
}
export const  TypeFilter=(data:any)=>{
    if(data){
        return "success"
    }
    else{
        return "primary"
    }
}
export const   statusFilter1=(data:any)=>{
    if(data){
        return "已生成合同"
    }
    else{
        return "未生成合同"
    }
}
export const getRole=(data:any)=>{
    switch(data){
        case 'input':return '录入人员'
        case 'counsellor':return '辅导员员'
        case 'director':return '院系主任'
        case 'f_approve':return '初审人员'
        case 's_approve':return '终审人员'
        case 'admin':return '系统管理员'
        default:return data
    }
}