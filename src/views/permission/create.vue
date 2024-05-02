<template>
   <div class="create">
    <div class="create-form">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="Form" label-width="100px">
      <el-form-item label="用户名" prop="account">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input type="password" v-model="ruleForm.password2" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="权限分配" prop="role_id">
        <el-radio-group v-model="ruleForm.role_id">
          <el-radio label="1">录入人员</el-radio>
          <el-radio label="2">辅导员</el-radio>
          <el-radio label="3">院系主任</el-radio>
          <el-radio label="4">初审人员</el-radio>
          <el-radio label="5">终审人员</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm(Form)" type="primary">创建</el-button>
        <el-button @click="resetFields(Form)">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { permissionCreateUser } from '@/api/user';
import {useRouter} from 'vue-router';
// import { validate } from '@babel/types';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { reactive, ref } from 'vue';
const router=useRouter()
const Form=ref<FormInstance>()
const ruleForm=reactive({
    account: '',
        password: '',
        password2: '',
        role_id: '2'
})
const validatePass2=(rule:any,value:any,callback:any)=>{
           if(value===''){
            callback(new Error('请再次输入密码'))
           }
           else if (value!==ruleForm.password){
                callback(new Error('两次输入密码不一致'))
           }
           else{
            callback()
           }
}  
const rules=reactive<FormRules>({
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 18, message: '长度在 6 到 18个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {validator: validatePass2}
        ],
        role_id: [
          { required: true, message: '请选择权限', trigger: 'change' }
        ]
      })
const submitForm=async (forName:FormInstance | undefined)=>{
  if(!forName) return false
  await forName.validate((validate,fields)=>{
    if(validate){
       const temp = {
            account: ruleForm.account,
            password: ruleForm.password,
            role_id: ruleForm.role_id
          }
          permissionCreateUser(temp).then((res)=>{
            if(res.data.code===20000){
                router.push('/permission/list')
                ElMessage({
                
                message: 'Created Successfully',
                type: 'success',
                duration: 2000
                })
            }
          })
    }
    else{
        console.log('error submit!!');
        return false
        
    }
  })
}   
const resetFields=(forName:FormInstance|undefined)=>{
    if(!forName) return false
    forName.resetFields()
}
</script>

<style scoped>

</style>