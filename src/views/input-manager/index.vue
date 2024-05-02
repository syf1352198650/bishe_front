<template>
  <div class="input-manager">
    <div class="search">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="state.query.name" @input="getList()">
      </el-input>
    </div>
    <div class="input-manager-table">
      <el-table :data="state.lists" style="width: 100%">
        <el-table-column fixed prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="birthday" label="出生日期" align="center">
          <template #default="scope">
            <span>
              {{getBirday(scope.row.birthday)}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" align="center">
          <template #default="scope">
            <span>
              {{getSex(scope.row.sex)}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="education" label="教育程度" align="center">
          <template #default="scope">
            <span>
              {{getEducation(scope.row.education)}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="address1" label="居住地址" align="center"></el-table-column>
        <el-table-column prop="mobile_phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="status" label="申请状态" align="center">
          <template #default="scope">
            <el-tag :type="statusTypeFilter(scope.row.status)">{{statusFilter(scope.row.status)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template #default="scope">
            <el-button size="small" type="primary" @click="edit(scope.row)"
              :disabled="scope.row.status==1||scope.row.status==4||scope.row.status>=5">编辑</el-button>
            <el-button size="small" type="danger" @click="del(scope.row)"
              :disabled="scope.row.status==1||scope.row.status==4||scope.row.status>=5">删除</el-button>
            <el-button size="small" type="success" @click="SubmitToApprove(scope.row)"
              :disabled="scope.row.status==1||scope.row.status==4||scope.row.status>=5">提交审核</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
    v-model="state.dialogEditVisible"
    title="Tips"
    width="30%"
    
  >
  <el-form :model="state.form">
        <el-form-item label="id"
                      :label-width="state.formLabelWidth"
                      v-show="false">
          <el-input v-model="state.form.id"></el-input>
        </el-form-item>
        <el-form-item label="姓名"
                      :label-width="state.formLabelWidth">
          <el-input v-model="state.form.name"
                    class="filter-item"
                    autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别"
                      :label-width="state.formLabelWidth"
                      prop="sex">
          <el-select v-model="state.form.sex"
                     class="filter-item"
                     placeholder="Please select">
            <el-option v-for="item in sexOptions"
                       :key="item.key"
                       :label="item.display_name"
                       :value="item.key" />
          </el-select>
        </el-form-item>
      </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.dialogEditVisible = false">取消</el-button>
        <el-button type="primary" @click="update()"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
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
import {ElMessageBox,ElMessage} from "element-plus"
import { loanList, loanUpdate, loanDelete, loanSubmitToApprove } from "@/api/user"
import { computed, ref } from "@vue/reactivity";
import { onMounted, reactive } from 'vue';
import {statusFilter,getEducation,getSex,statusTypeFilter,getBirday} from "@/utils/fillter"


const sexOptions = [
  { key: 'man', display_name: '男' },
  { key: 'woman', display_name: '女' }
];
const state = reactive({
  lists: [], // 展示数据
  rows: ref(1), // 总条数
  pages: ref(1), // 总页数
  query: { // 请求数据
    pageNo: 1,
    pageSize: 10,
    name: ''
  },
  form: {
    id: '',
    name: '',
    sex: ''
  },
  formLabelWidth: '60px',
  sexOptions,
  dialogEditVisible: false, //编辑弹层
})


// const fillterLists = computed(() => {
//   return state.lists.map((list: any) => {
//     list.birthday=getBirday(list.birthday)
//     list.education=getEducation(list.education)
//     list.sex=getSex(list.sex)
//     list.tagStatus=statusTypeFilter(list.status)
//     list.conStatus=statusFilter(list.status)
    
//     return list
//   })
// })
const handleSizeChange=(val:number)=>{
  state.query.pageSize=val
  getList()
}
const handleCurrentChange=(val:number)=>{
  state.query.pageNo=val
  getList()
}
const getList = () => {
  loanList(state.query).then((res) => {
   
  console.log(res);
  
    if (res?.data?.data?.data) {
      state.lists = res.data.data.data.data
      state.rows = res.data.data.rrows
      state.pages = res.data.data.pages
    } else {
      state.lists = []
      state.rows = 0
      state.pages = 0
    }
  })
}
const SubmitToApprove = (row: any) => {
       loanSubmitToApprove({id:row.id}).then((res)=>{
        if(res.data.code===20000){
            getList()
            ElMessage({
            type: 'success',
            message: '提交成功!',
            duration: 2000
          })
        }
       })
}
const del = (row: any) => {
  ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(()=>{
        loanDelete({id:row.id}).then((res)=>{
          if(res.data.code===20000){
            getList()
            ElMessage({
              type: 'success',
              message: '删除成功!',
              duration: 2000
            })
          }
        })
      }).catch(()=>{
        ElMessage({
          type: 'info',
          message: '已取消删除'
        })
      })
}
const edit = (row: any) => {
state.dialogEditVisible=true
state.form=Object.assign({},row)
}
const update=()=>{
 loanUpdate(state.form).then((res)=>{
  if(res.data.code===20000){
    state.dialogEditVisible=false
    getList()
    state.form={id: '',
    name: '',
    sex: ''}
    ElMessage({
      type: 'success',
            message: '编辑成功!',
            duration: 2000
    })
  }
 })
}
onMounted(() => {
  getList()
})
</script>

<style scoped>
.input-manager {
  margin-top: 20px;
}
.page {
  width: 50%;
  margin: 20px auto;
  text-align: center;
}
.el-input,
.el-select {
  width: 100%;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>