<template>
  <div class="list">
    <el-table :data="state.lists" style="width: 100%">
      <el-table-column  prop="account"  label="用户名"></el-table-column>
      <el-table-column  prop="password"  label="密码"></el-table-column>
      <el-table-column  prop="reg_time"  label="创建时间">
        <template #default="{row}">
          <span>{{getBirday(row.reg_time)}}</span>
        </template>
      </el-table-column>
      <el-table-column  prop="creator"  label="创建者"></el-table-column>
      <el-table-column  prop="role_name"  label="权限分配">
        <template #default="{row}">
          <span>{{getRole(row.role_name)}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import {getBirday,getRole} from "@/utils/fillter"
import {permissionUserlist} from "@/api/user"
import { onMounted, reactive } from "vue";
const state=reactive({
    lists:[]
})
const getlist=()=>{
    permissionUserlist().then((res)=>{
        if(res.data.code===20000){
            state.lists=res.data.data
        }
    })
}
onMounted(()=>{
    getlist()
})
</script>

<style scoped>
  .list{
    margin-top: 20px;
  }
</style>