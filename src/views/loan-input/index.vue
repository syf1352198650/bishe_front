<template>
    <div class="loan-input">
        <el-form ref="ruleFormRef" :model="temp" :rules="rules" label-width="120px" class="demo-ruleForm"
            :size="formSize" status-icon>
            <el-card>
                <template #header>
                    <div class="clearfix"><span>个人基本信息</span></div>
                </template>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="12" :md="8" :lg="8">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="temp.name" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="8">
                        <el-form-item label="出生日期" prop="birthday">
                            <el-date-picker type="datetime" v-model="temp.birthday" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="8">
                        <el-form-item label="性别" prop="sex">
                            <el-select v-model="temp.sex" class="filter-item" placeholder="Please select">
                                <el-option v-for="item in sexOptions" :key="item.key" :label="item.display_name"
                                    :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="12" :md="8" :lg="8">
                        <el-form-item label="身份证" prop="identity_card">
                            <el-input v-model.number="temp.identity_card" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="12" :md="8" :lg="8">
                        <el-form-item label="婚姻状态" prop="marriage">
                            <el-select v-model="temp.marriage" class="filter-item" placeholder="Please select">
                                <el-option v-for="item in marriageOptions" :key="item.key" :label="item.display_name"
                                    :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="8">
                        <el-form-item label="教育程度" prop="education">
                            <el-select v-model="temp.education" class="filter-item" placeholder="Please select">
                                <el-option v-for="item in educationOptions" :key="item.key" :label="item.display_name"
                                    :value="item.key" />
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="8">
                        <el-form-item label="居住地址" prop="address1">
                            <el-input v-model="temp.address1" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="10">
                    <el-col :xs="24" :sm="12" :md="8" :lg="8">
                        <el-form-item label="户籍地址" prop="address2">
                            <el-input v-model="temp.address2" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="8">
                        <el-form-item label="居住电话" prop="phone">
                            <el-input v-model.number="temp.phone" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="8">
                        <el-form-item label="手机号" prop="mobile_phone">
                            <el-input v-model.number="temp.mobile_phone" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            
            
            <el-card>
                <template #header>
                    <div class="clearfix"><span>家庭联系人</span></div>

                </template>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="12" :md="8" :lg="8">
                        <el-form-item label="关系1" prop="contact">
                            <el-input v-model="temp.contact" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="8">
                        <el-form-item label="姓名" prop="contact_name">
                            <el-input v-model="temp.contact_name" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="8">
                        <el-form-item label="手机" prop="contact_phone">
                            <el-input v-model.number="temp.contact_phone" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="12" :md="8" :lg="8">
                        <el-form-item label="关系2" prop="contact2">
                            <el-input v-model="temp.contact2" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="8">
                        <el-form-item label="姓名" prop="contact2_name">
                            <el-input v-model="temp.contact2_name" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="8">
                        <el-form-item label="手机" prop="contact2_phone">
                            <el-input v-model.number="temp.contact2_phone" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <el-card>
                <template #header>
                    <div class="clearfix"><span>贷款项</span></div>

                </template>
                <el-row :gutter="10">
                    <el-col :xs="24" :sm="12" :md="8" :lg="8">
                        <el-form-item label="贷款金额(元)" prop="contract_amount">
                            <el-input v-model,number="temp.contract_amount" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="8">
                        <el-form-item label="贷款年限(年)" prop="contract_time">
                            <el-input v-model.number="temp.contract_time" />
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8" :lg="8">
                        <el-form-item label="贷款利率(%)" prop="contract_rate">
                            <el-input v-model.number="temp.contract_rate" />
                        </el-form-item>
                    </el-col>
                </el-row>
                
            </el-card>
            <el-card>
                <template #header>
                    <div class="clearfix"><span>备注</span></div>
              
                </template>
                <el-row :gutter="10">
                    <el-input
    v-model="temp.remark"
    :rows="4"
    type="textarea"
    placeholder="Please input"
  />
                </el-row>
            </el-card>


        </el-form>
        <el-card>
              <el-upload
    v-model:file-list="fileList"
    action='#'
    :multiple="true"
    class="upload-demo"
    :auto-upload="false"
    :on-change="handleChange"
    :on-success="handsuccess"
  >
    <el-button type="primary">选择添加附件</el-button>
    <template #tip>
      <div class="el-upload__tip">
        请将文件进行压缩，可以加快上传
      </div>
    </template>
  </el-upload>
        </el-card>
        <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm(ruleFormRef)">立即创建</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </div>
    </div>
</template>
 
<script setup lang="ts">
import {loanCreate,uploadFiles as uploadFilesFn ,mergeFiles as mergeFilesFn} from "@/api/user"
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules,UploadProps, UploadUserFile } from 'element-plus'
import {ElNotification} from "element-plus"
import { useRouter } from "vue-router";
import { log } from "console";
const router=useRouter()
const fileList = ref<UploadUserFile[]>([
 
])
const handsuccess=()=>{
    console.log(1);
    
}

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
//   fileList.value = fileList.value.slice(-3)
fileList.value.push(uploadFile)
console.log('files',uploadFile.name);
console.log('files',uploadFiles);
 uploadFilesHand()
}
const limt={
    size:1024*500
}
const uploadFilesHand=()=>{
    
      let tasks=[]
    fileList.value.map((file)=>{
        console.log('文件大小',file.size);
        console.log('文件名字',file.name.split('.')[0]);
        
       const chunkNum=Math.ceil(file.size/limt.size)
       console.log('分片数目',chunkNum);
       let start=0;
       let end;
       let index=0;
       while(start<file.size){
        console.log('map');
        
        end=start+limt.size;
        if(end>file.size){
            end=file.size;
            // return;;
        }
        let soloChunk=file.raw.slice(start,end)
        start=end;
        const formData=new FormData();
        formData.append('file',soloChunk,file.name.split('.')[0]+'-'+index+'.'+file.name.split('.')[1])
        tasks.push(uploadFilesFn(formData))
        index++;
       }
       
         console.log(tasks);
     Promise.all(tasks).then((res)=>{
        console.log('promise',res);
        let params={
            chunkNum:chunkNum,
            filename:file.name.split('.')[0],
            type:file.name.split('.')[1]
        }
        mergeFilesFn(params).then((res)=>{
            console.log('上传成功');
            
        })
             })
    })
    
     
    
    // uploadFilesFn(formData).then((res)=>{
    //     console.log('上传成功');
        
    // })
  
    
}
   

const sexOptions = [
    { key: 'man', display_name: '男' },
    { key: 'woman', display_name: '女' }
]
//行业
const companyOptions = [
    { key: 'education', display_name: '教育' },
    { key: 'finance', display_name: '金融' }
]
//婚否
const marriageOptions = [
    { key: 'married', display_name: '已婚' },
    { key: 'unmarried', display_name: '未婚' }
]
//学历
const educationOptions = [
    { key: 'college', display_name: '大学' },
    { key: 'highschool', display_name: '高中' }
]
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const temp = reactive({
    name: '',//姓名
    identity_card: '',//身份证
    birthday: '',//出生日期
    sex: '',//性别
    marriage: '',//婚姻状态
    education: '',//教育程度
    address1: '',//居住地址
    address2: '',//户籍地址
    phone: '',//居住电话
    mobile_phone: '',//手机号
    contact: '',//关系1
    contact_name: '',//姓名
    contact_phone: '',//手机
    contact2: '',//关系2
    contact2_name: '',//姓名
    contact2_phone: '',//手机
    contract_amount:'',//贷款金额
    contract_time:'',//贷款年限
    contract_rate:'',//贷款利率
    remark: ''//备注
})

const rules = reactive<FormRules>({
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        identity_card: [
          { required: true, message: '请输入身份证', trigger: 'change' }
        ],
        birthday: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        marriage: [
          { required: true, message: '请选择婚姻状态', trigger: 'change' }
        ],
        education: [
          { required: true, message: '请选择教育程度', trigger: 'change' }
        ],
        trade: [
          { required: true, message: '请选择所属行业', trigger: 'change' }
        ],

        address1: [
          { required: true, message: '请输入居住地址', trigger: 'blur' }
        ],
        address2: [
          { required: true, message: '请输入户籍地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入居住电话', trigger: 'blur' }
        ],
        mobile_phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入现职公司全称', trigger: 'blur' }
        ],
        position:[
          { required: true, message: '请输入职位', trigger: 'blur' }
        ],
        address3:[
          { required: true, message: '请输入公司地址', trigger: 'blur' }
        ],
        company_type:[
          { required: true, message: '请输入公司类型', trigger: 'blur' }
        ],
        company_email:[
          { required: true, message: '请输入公司邮箱', trigger: 'blur' }
        ],
        company_phone:[
          { required: true, message: '请输入公司电话', trigger: 'blur' }
        ],
        income:[
          { required: true, message: '请输入收支情况', trigger: 'blur' }
        ],
        contact:[
          { required: true, message: '请输入关系1', trigger: 'blur' }
        ],
        contact_name:[
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        contact_phone:[
          { required: true, message: '请输入手机', trigger: 'blur' }
        ],
        contact2:[
          { required: true, message: '请输入关系2', trigger: 'blur' }
        ],
        contact2_name:[
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        contact2_phone:[
          { required: true, message: '请输入手机', trigger: 'blur' }
        ],
        contact2_dep:[
          { required: true, message: '请输入部门', trigger: 'blur' }
        ],
        contact2_pos:[
          { required: true, message: '请输入职位', trigger: 'blur' }
        ]
      })

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return false
    await formEl.validate((valid, fields) => {
        if (valid) {
            loanCreate(temp).then((res)=>{
                router.push('/input-manager/index')
                ElNotification({
    title: 'Success',
    message: 'This is a success message',
    type: 'success',
  })
            })
        } else {
            console.log('error submit!', fields)
            return false
        }
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}


</script>

<style scoped>
.dialog-footer{
    margin-top: 20px;
    display: flex;
    justify-content:space-around
}
</style>