<template>
    <div class="content_main">
        <left-menu></left-menu>
        <div class="right_content menu_open">
            <top-cache-menu></top-cache-menu>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb_body">
                <el-breadcrumb-item>{{ fatherMenu }}</el-breadcrumb-item>
                <el-breadcrumb-item>{{ thisMenu }}</el-breadcrumb-item>
            </el-breadcrumb>
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive" :key="$route.fullPath"></router-view>
        </div>
    </div>
</template>
    
<script>
    import LeftMenu from "@/components/public/LeftMenu";
    import TopCacheMenu from "@/components/public/TopCacheMenu";
    export default {
        data(){
            return{
                
            }
        },
        components: {LeftMenu, TopCacheMenu},
        computed: {
            fatherMenu(){
                let fatherMenu = {
                    "NODE_ID": 1,
                    "MENU_NAME": "系统模块",
                    "PIC_ICON": "",
                    "URL_LINK": "/home",
                    "F_NODE": 0,
                    "children": [],
                    "menuType": ""
                };
                return fatherMenu.MENU_NAME
            },
            thisMenu(){
                let childmenu = this.$store.state.menus.childmenu
                return childmenu ? childmenu.MENU_NAME : ""
            },
            // 缓存的路由列表
            keepAliveList(){
                let keepAliveList = this.$store.state.menus.cacheList.map((item)=>{
                    return item.meta.name;
                });
                return keepAliveList;
            }
        },
        mounted(){
        },
        methods: {
        }
    }
</script>
    
<style>
</style>