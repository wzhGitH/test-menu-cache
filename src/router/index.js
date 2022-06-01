
import Vue from 'vue'
import VueRouter from 'vue-router'
import AppPage from '../views/AppPage.vue'

const Home = () => import("../views/Home.vue")
const FormList = () => import("../views/form/FormList.vue")
const FormEdit = () => import("../views/form/FormEdit.vue")
const FormInfo = () => import("../views/form/FormInfo.vue")
const MenuList = () => import("../views/system/MenuList.vue")
const MenuAdd = () => import("../views/system/MenuAdd.vue")
const RoleList = () => import("../views/system/RoleList.vue")

Vue.use(VueRouter)

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '',
        redirect: "home"
    },
    {
        path: "",
        component: AppPage,
        children: [
            {
                path: "/home",
                component: Home,
                meta: {
                    title: "首页",
                    keepAlive: false,
                    name: "home"
                }
            },
            {
                path: "/formList",
                component: FormList,
                meta: {
                    title: "表单列表",
                    keepAlive: true,
                    name: "form-list"
                }
            },
            {
                path: "/formEdit",
                component: FormEdit,
                meta: {
                    title: "表单编辑",
                    keepAlive: true,
                    name: "form-edit"
                }
            },
            {
                path: "/formInfo",
                component: FormInfo,
                meta: {
                    title: "表单详情",
                    keepAlive: true,
                    name: "form-info"
                }
            },
            {
                path: "/menuList",
                component: MenuList,
                meta: {
                    title: "菜单列表",
                    keepAlive: true,
                    name: "menu-list"
                }
            },
            {
                path: "/menuAdd",
                component: MenuAdd,
                meta: {
                    title: "菜单新增",
                    keepAlive: true,
                    name: "menu-add"
                }
            },
            {
                path: "/roleList",
                component: RoleList,
                meta: {
                    title: "角色列表",
                    keepAlive: true,
                    name: "role-list"
                }
            }
        ]
    }
]
const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})
export default router
  
