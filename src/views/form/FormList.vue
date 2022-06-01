<template>
    <div class="content_wrap">
        <div class="animation_content content_block">
            <div>
                <div class="table_list" v-loading="isGetLoading">
                    <el-table :data="itemList" border style="width: 100%">
                        <el-table-column prop="MENU_NAME" label="菜单名称"></el-table-column>
                        <el-table-column prop="URL_LINK" label="链接" width="180"></el-table-column>
                        <el-table-column prop="F_NAME" label="父级菜单名称"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="item">
                                <button class="text_btn" @click="btnInfo(item)"><i class="el-icon-info"></i>详情</button>
                                <button class="text_btn" @click="btnEdit(item)"><i class="el-icon-edit-outline"></i>编辑</button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
    import menus from "@/assets/json/menuList.json";
    export default {
        data(){
            return{
                itemList: menus,
                isGetLoading: false
            }
        },
        
        created(){
            console.log("表单列表页面重新加载");
        },
        computed: {
            reloadRouter(){
                let reloadRouter = this.$store.state.menus.reloadRouter;
                return reloadRouter;
            }
        },
        watch: {
            reloadRouter(newV){
                const _this = this;
                if(newV) {
                    console.log("确认要刷新");
                    this.search()
                    this.$store.commit('initRouter');
                }
            }
        },
        methods: {
            // 编辑
            btnEdit(item){
                let data = item.row;
                this.$router.push({ path: "/formEdit", query: { code: data.NODE_ID } });
            },
            // 详情
            btnInfo(item){
                let data = item.row;
                this.$router.push({ path: "/formInfo", query: { code: data.NODE_ID } });
            },
            search(){
                console.log("重新获取数据");
            }
        },
    }
</script>
    
<style>
</style>