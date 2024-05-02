import {RouteRecordRaw} from "vue-router"
import { defineStore } from "pinia"
import { routes , asyncRoutes } from "@/router/index"
// import { resolve } from "path"
class Permission {
    allRoutes: Array<any> = []
}
export const usePermission = defineStore('permission', {
    state() {
        return new Permission


    },
    actions: {
        GenerateRoutes(roles: Array<any>) {
            return new Promise((resolve) => {
                let accessedRoutes;
                if (roles.includes("admin")) {
                    accessedRoutes = asyncRoutes
                }
                else {
                    accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
                }
                this.$patch({
                    // allRoutes: accessedRoutes.concat(routes)
                    allRoutes:(routes as any).concat(accessedRoutes)
                })
                // console.log("accessedRoutes", this.allRoutes);

                resolve(this.allRoutes) 
            })
        }
    }
})
function filterAsyncRoutes(routes: any, v: any) {
    const res: Array<any> = [];
    routes.forEach((route: any) => {
        //判断是否有角色属性，以及属性中是否有角色值
        var bool =
            route.meta &&
            route.meta.roles &&
            v.some((role: any) => route.meta.roles.includes(role));
        if (bool) {
            res.push(route);
        }
    });
    return res;
}

