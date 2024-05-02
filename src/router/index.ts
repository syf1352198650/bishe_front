import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'
import {useUser} from "@/store/user"
// import{storeToRefs} from "pinia"
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    meta:{
      title:''
    },
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/home/index.vue"),
        name: "home",
        meta: {
          title: "首页",
        },
      },
    ],
  },
]
export const asyncRoutes = [
  //异步路由
  {
    path: "/loan-input", //loan-input贷款申请
    component: Layout,
    redirect: "/loan-input/index",
    meta: {
      roles: ["input"], //角色销售人员
    },
    children: [
      {
        path: "/loan-input/index",
        component: () => import("@/views/loan-input/index.vue"),
        name: "loan-input",
        meta: {
          title: "贷款申请",
        },
      },
    ],
  },
  {
    path: "/input-manager", //input-manager申请管理
    redirect: "/input-manager/index",
    component: Layout,
    meta: {
      roles: ["input"], //角色销售人员
    },
    children: [
      {
        path: "/input-manager/index",
        component: () => import("@/views/input-manager/index.vue"),
        name: "input-manager",
        meta: {
          title: "申请管理",
        },
      },
    ],
  },
  {
    path: "/risk-assess", //input-manager申请管理
    redirect: "/risk-assess/index",
    component: Layout,
    meta: {
      roles: ["input"], //角色销售人员
    },
    children: [
      {
        path: "/risk-assess/index",
        component: () => import("@/views/input-manager/index.vue"),
        name: "risk-assess",
        meta: {
          title: "风险评估",
        },
      },
    ],
  },
  {
    path: "/loan-approve", //loan-approve贷款审批
    component: Layout,
    redirect: "/loan-approve/first",
    meta: {
      title: "贷款审批",
      roles: ["approve"], //角色审核人员
    },
    children: [
      {
        path: "/loan-approve/first", //first 初审
        component: () => import("@/views/loan-approve/first.vue"),
        name: "loan-approve/first",
        meta: {
          title: "初审",
        },
      },
      {
        path: "/loan-approve/end", //end  终审
        component: () => import("@/views/loan-approve/end.vue"),
        name: "loan-approve/end",
        meta: {
          title: "终审",
        },
      },
    ],
  },

  {
    path: "/contract", //contract标的管理
    component: Layout,
    redirect: "/contract/index",
    children: [
      {
        path: "/contract/index",
        component: () => import("@/views/contract/index.vue"),
        name: "contract",
        meta: {
          title: "标的管理",
        },
      },
    ],
  },
  {
    path: '/permission',
    redirect: '/permission/create',
    component:Layout,
    meta:{title:'权限管理'},
    children:[
      {
        path: '/permission/create',
        name:'permission/create',
        component: () => import('@/views/permission/create.vue'),
        meta:{title:'创建人员'}
      },
      {
        path: '/permission/list',
        name:'permission/list',
        component: () => import('@/views/permission/list.vue'),
        meta:{title:'列表展示'}
      }]},
  // { path:'/:catchAll(.*)', redirect: "/login" },

];


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
