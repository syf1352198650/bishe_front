<template>
 <div class="contract">
    <!-- 搜索 -->
    <div class="search">
      <el-input
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="state.query.name"
        @input="getList"
      ></el-input>
    </div>
    <!-- 表格 -->
    <div class="input-manager-table">
      <el-table :data="state.lists" stripe style="width: 100%">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column
          prop="identity_card"
          label="身份证号"
        ></el-table-column>
        <el-table-column prop="file_path" label="合同状态">
          <template #default="{ row }">
            <el-tag :type="TypeFilter(row.file_path)">{{
              statusFilter1(row.file_path)
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              size="mini"
              type="primary"
              @click="handleCreate(row)"
              :disabled="row.status != 5"
              >生成合同</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="handleDownload(row)"
              :disabled="row.status < 7"
              >下载合同</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="state.query.pageNo"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="state.query.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="state.rows"
    ></el-pagination>
  </div>
</template>

<script setup lang="ts">
import {statusFilter1,TypeFilter} from "@/utils/fillter"
import {contractList,contractCreateFile,contractDownload } from "@/api/user"
import { getToken} from "@/utils/cookie"
import { number } from "echarts";
import { ElMessage, rowContextKey } from "element-plus";
import { onMounted, reactive } from "vue";

const state=reactive({
    lists: [],
      rows: 1,
      pages: 1,
      query: {
        pageNo: 1, // 当前页码
        pageSize: 10, // 当前页数
        name: "",
      },
})
const getList=()=>{
    contractList(state.query).then((res)=>{
        if(res.data.code===20000){
            state.lists=res.data.data.data.data
            state.rows=res.data.data.rows
            state.pages=res.data.data.pages
            
            
        }
    })
}
const handleCreate=(row:any)=>{
    contractCreateFile({id:row.id}).then((res)=>{
        if(res.data.code===2000){
            getList()
            ElMessage({
                type: "success",
            message: "生成合同提交成功",
            duration: 2000,
            })
        }
    })
}
const  handleDownload=(row:any)=>{
    contractDownload({id:row.id}).then((res)=>{
              if(res.data.code===20000){
                getList()
                ElMessage({
                    type: "success",
            message: "生成合同提交成功",
            duration: 2000,
                })
                let url=res.data.data.url
                let name=url.substring(url.lastIndexOf("/",url.length))
                console.log(url, ',',name, "===========");
                downloadUrlFile(url)
              }      
    })
}
const downloadUrlFile=(url:string)=>{
    const xhr=new XMLHttpRequest()
    xhr.open('GET',url,true)
    xhr.withCredentials=true
    xhr.responseType="blob"
    xhr.setRequestHeader('token',getToken())
    xhr.onload=()=>{
        if(xhr.status===200){
            console.log(xhr,'xhr');
            let filename=xhr.responseURL.substring(xhr.responseURL.lastIndexOf("/")+1)
            saveAs(filename,xhr.response)
        }
    }
    xhr.send()
}
const saveAs=(name:string,data:any)=>{
  let urlObject=window.URL
  let export_blob=new Blob([data])
  let save_link=document.createElement("a")
  save_link.href=urlObject.createObjectURL(export_blob)
  save_link.download=name
  save_link.click()
}
const handleSizeChange=(val:number)=>{
     state.query.pageSize=val
     getList()
}
const handleCurrentChange=(val:number)=>{
  state.query.pageNo=val
  getList()
}
onMounted(()=>{
    getList()
})
</script>

<style scoped>
.contract {
  margin-top: 20px;
}
</style>