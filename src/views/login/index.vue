<template>
    <div class="login-container">
    <div class="login">
      <h2>助学贷款管理系统<el-icon><UserFilled /></el-icon></h2>
      <el-form :model="loginForm" ref="Form" :rules="rules">
        <el-form-item label="" prop="account">
          <el-input prefix-icon="UserFilled" class="login-input-text" v-model="loginForm.account" placeholder="admin" ></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input prefix-icon="Briefcase"  class="login-input-text" type="password" v-model="loginForm.password" placeholder="密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(Form)">login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref } from 'vue'
import {useUser } from '@/store/user'
import {IUser,User} from "@/models/User"
import { FormInstance, FormItemInstance } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';
const user=useUser()
const route=useRoute()
const router = useRouter()
const Form=ref()
const loginForm:IUser=reactive(new User())
const rules={
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
          {}
        ],
      }
const submitForm=(form:FormInstance)=>{
  form.validate(async (valid:boolean)=>{
    if(valid){
      const res=await user.Login(loginForm)
      router.push('/home')
    }
    else{
      console.log('submitForm');
      
    }
  })
}
</script>

<style scoped>
 .login {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    margin: 0 auto;
    background: #fff;
    width: 30%;
    padding:60px 40px;
  }
 .login-container {
    width: 100%;
    height: 100%;
    background: url('~@/assets/img/loginbg.jpg') center center no-repeat;
  }
  .login h2 {
    text-align: center;
    margin-bottom: 40px;
  }
  .el-button {
    width: 100%;
  }
 
</style>