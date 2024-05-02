<template>
    <div>
        <el-menu 
  router 
  class="el-menu-vertical-demo" 
  :default-active="'/'" 
  text-color="#9bb0be" active-text-color="#3980cb" 
  background-color="#304156" 
  unique-opened >
    <sidebar-item v-for="route in routes.permission_routes" :key="route.path" :item="route" :basePath="route.path" />
  </el-menu>
    </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { reactive } from 'vue';
import {usePermission} from "@/store/permission"
import SidebarItem from "@/layouts/components/SlidebarItem.vue"

const permission=usePermission()
// console.log(permission.allRoutes,'routesss');

const routes=reactive({
    permission_routes:computed(()=>{
        return permission.allRoutes
    })
})
</script>

<style scoped>
 .el-aside .el-menu {
    height: 100%;
    border-right: 0px;
  }
</style>