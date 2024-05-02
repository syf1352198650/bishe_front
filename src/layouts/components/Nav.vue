<template>
    <div class="header">
        <div class="breadcrumb">
            <div class="tubiao">
                <el-icon>
                    <Fold />
                </el-icon>
            </div>


            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(v,i) in data.lists" :key="i">{{(v as any).meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>

        </div>
        <!-- 右侧下拉 -->
        <div class="right-dropdown">
            <el-dropdown>
                <span class="el-dropdown-link">
                    退出 <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>
                            <span style="display:block;" @click="logout">退出</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>

</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { useUser } from '@/store/user'

const route = useRoute()
const router = useRouter()
const user = useUser()
let data = reactive({
    lists: []
})
const getRouter = () => {
    (data.lists as any) = route.matched.filter(v => v?.meta?.title)
}
console.log('route martch',route.matched);

const logout = () => {
    user.Logout().then(() => {
        router.push('/login')
    }).catch((error) => {
        console.log(error);

    })
}
onMounted(() => {
    getRouter()
    // console.log(data.lists, 'data.lists');

})
watch(() => router.currentRoute.value.path, (toPath) => {
    //要执行的方法
    getRouter()
}, { immediate: true, deep: true })
</script>

<style scoped>
.header .breadcrumb {
    width: 50%;
    height: 60px;
    line-height: 60px;
    float: left;
}

.header .breadcrumb .tubiao {
    float: left;
    margin-right: 5px;
    width: 24px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
}

.header .breadcrumb .el-breadcrumb {
    height: 60px;
    line-height: 60px;
    float: left;
}

.right-dropdown {
    float: right;
    line-height: 60px;
    height: 60px;
}
.el-dropdown-link{
    line-height: 60px;
    height: 60px;
}
</style>