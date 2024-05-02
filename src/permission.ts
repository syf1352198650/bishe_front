import router from '@/router/index'
import { getToken } from "@/utils/cookie"
const whiteList = ["/login"];
import { useUser } from "@/store/user"
import { usePermission } from "@/store/permission"
router.beforeEach(async (to, from, next) => {
    const user = useUser()
    const permission = usePermission()


    const hasToken = getToken()
    if (hasToken) {
       

        if (to.path == "/login") {
            next()
        }
        else {
          

            const hasRoles = user && user.roles && user.roles.length > 0
            if (hasRoles) {
                // console.log('route', router);

                next()
            }
            else {
            ;

                try {
                    const { roles } = (await user.GetInfo() as any)
                    let roleNames = roles.map((r: any) => r.name)
                    
                    const accessedRoutes = (await permission.GenerateRoutes(roleNames) as any)
                    // console.log("accessRoutes", accessedRoutes);
                    accessedRoutes.forEach((r: any) => {
                        router.addRoute(r)
                    })
                    next('/home')
                } catch (error) {
                    console.log(error);

                }
            }
        }
    }
    else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        }
        else {
            next(`/login`)
        }
    }



})
