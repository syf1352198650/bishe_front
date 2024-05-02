<template>
    <div class="loan-approve-first">
      <!-- 搜索 -->
      <div class="search">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="state.query.name" @input="getList()"></el-input>
      </div>
      <!-- 表格 -->
      <div class="input-manager-table">
        <el-table :data="state.lists" style="width: 100%">
          <el-table-column fixed prop="name" label="姓名" align="left" ></el-table-column>
          <el-table-column prop="birthday" label="出生日期" align="left" >
            <template #default='scope'>
              <span>
                {{getBirday(scope.row.birthday)}}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="identity_card" label="身份证" align="left" ></el-table-column>
          <el-table-column label="操作" width="300" align="left" >
            <template #default="{row}">
              <el-button size="small" type="primary" @click="handleDetails(row)" >查看</el-button>
              <el-button size="small" type="success" @click="handlePass(row)" :disabled="row.result==='reject'|| row.result==='pass'" >通过</el-button>
              <el-button size="small" type="danger" @click="handleReject(row)" :disabled="row.result==='reject'|| row.result==='pass'" >拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 查看详情弹层功能 -->
      <el-dialog title="贷款审批-查看详情" v-model="state.dialogDetailsVisible" width="34%">
        <el-form :model="state.temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
          <el-form-item label="id">
            <el-input v-model="state.temp.id" autocomplete="off" readonly></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="state.temp.name" autocomplete="off" readonly></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-input :value="getBirday(state.temp.birthday)" autocomplete="off" readonly></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input :value="getSex(state.temp.sex)" readonly />
          </el-form-item>
          <el-form-item label="教育程度">
            <el-input :value="getEducation(state.temp.education)" readonly />
          </el-form-item>
          <el-form-item label="居住地址">
            <el-input v-model="state.temp.address1" readonly/>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model.number="state.temp.mobile_phone" readonly/>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="state.temp.identity_card" readonly/>
          </el-form-item>
        </el-form>
       <template #footer> <div  class="dialog-footer">
          <el-button @click="state.dialogDetailsVisible = false">取消</el-button>
        </div></template>
      </el-dialog>
      <!-- 分页 -->
      <div class="page">
        <el-pagination
        v-model:currentPage="state.query.pageNo"
        v-model:page-size="state.query.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :small="false"
        :disabled="false"
        :background="false"
        layout="total, sizes, prev, pager, next, jumper"
       :page-count="state.pages"
        :total="state.rows"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import {getBirday,getEducation,getSex} from "@/utils/fillter"
  import { onMounted, reactive } from 'vue';
  import {approveEndList,loanEndQuery,approveEndPass,approveEndReject} from "@/api/user"
  import { ElMessage, ElMessageBox } from "element-plus";
  const state=reactive({
      lists:[],
        rows:1, // 总条数
        pages:1, // 总页数
        query:{ // 请求数据
          pageNo:1, // 当前页码
          pageSize:10, // 当前页数
          name:''
        },
        temp:{ // 详情展示数据
          id: '',
          name: '', // 姓名
          birthday: '', // 出生日期
          sex: '', // 性别
          education: '', // 教育程度
          address1: '', // 居住地址
          mobile_phone: '', // 手机号
          identity_card:''//身份证号
        },
        dialogDetailsVisible:false // 详情弹层
  })
  const getList=()=>{
    approveEndList(state.query).then((res)=>{
      if(res.data.code===20000){
          state.lists=res.data.data.data.data
          state.rows=res.data.data.rows
          state.pages=res.data.data.pages
      }
      console.log(res);
      
     })
  }
  const handleSizeChange=(val:number)=>{
  
  }
  const handleCurrentChange=(val:number)=>{
  
  }
  const handleDetails=(row:any)=>{
    loanEndQuery({id:row.id}).then((res)=>{
          if(res.data.code===20000){
              state.temp=res.data.data.data
              state.dialogDetailsVisible=true
          }
          console.log(state.dialogDetailsVisible);
          
      })
  }
  const handlePass=(row:any)=>{
           ElMessageBox.confirm('是否通过初审？', '贷款审批-初审', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          approveEndPass({appId:row.id,loanIdL:row.id}).then((res)=>{
             if(res.data.code===20000){
             getList()
              ElMessage({
                  type: 'success',
                message: '通过初审',
                duration: 2000
              })
             }
          })
        }).catch(()=>{
          ElMessage({
              type: 'info',
            message: '已取消',
            duration: 2000
          })
        })
  }
  const handleReject=(row:any)=>{
     ElMessageBox.confirm('是否拒绝初审？', '贷款审批-拒绝', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          approveEndReject({appId:row.id,loanId:row.id}).then((res)=>{
              if(res.data.code===20000){
                  getList()
                  ElMessage({
                      type: 'success',
                message: '初审拒绝',
                duration: 2000
                  })
              }
          })
        }).catch(()=>{
          ElMessage({
              type: 'info',
            message: '已取消',
            duration: 2000
          })
        }) 
  }
  onMounted(()=>{
      getList()
  })
  </script>
  
  <style scoped>
   .loan-approve-first {
      margin-top: 20px;
    }
    .page {
      width: 50%;
      text-align: center;
      margin: 20px auto;
    }
  </style>