<template>
    <div class="content_wrap">
        <div class="animation_content content_block">
            <button class="btn_return margin_bottom" @click="goBack()">
                <i class="el-icon-d-arrow-left"></i>
                返回
            </button>
            <div class="search_box clear-float">
                <div class="search_title">{{ routerTitle }}</div>
            </div>
            <div v-loading="isGetLoading">
                <el-row>
                    <el-col :span="12">
                        <el-col :span="24" class="padding_bottom">
                            <label class="el-col-8 control-label eletRe_hint">菜单名称</label>
                            <div class="el-col-16 form_content position_relative">
                                <div class="form_item_info">{{ itemInfo.MENU_NAME }}</div>
                            </div>
                        </el-col>
                        <el-col :span="24" class="padding_bottom">
                            <label class="el-col-8 control-label eletRe_hint">菜单链接</label>
                            <div class="el-col-16 form_content">
                                <div class="form_item_info">{{ itemInfo.URL_LINK }}</div>
                            </div>
                        </el-col>
                    </el-col>
                    <el-col :span="12">
                        <el-col :span="24" class="padding_bottom">
                            <label class="el-col-8 control-label eletRe_hint">菜单id</label>
                            <div class="el-col-16 form_content">
                                <div class="form_item_info">{{ itemInfo.NODE_ID }}</div>
                            </div>
                        </el-col>
                        <el-col :span="24" class="padding_bottom">
                            <label class="el-col-8 control-label eletRe_hint">父菜单id</label>
                            <div class="el-col-16 form_content">
                                <div class="form_item_info">{{ itemInfo.F_NODE }}</div>
                            </div>
                        </el-col>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import menus from "@/assets/json/menuList.json";
    export default {
        data(){
            return{
                routerTitle: "",
                code: "",
                itemInfo: {},
                itemList: menus,
                isLoading: false,
                isGetLoading: false,
                reloadRouter: false
            }
        },
        mounted(){
            console.log("表单详情页面重新加载");
            this.code = this.$route.query.code;
            this.init();
        },
        methods: {
            init(){
                this.itemInfo = this.itemList.find((elt)=> {
                    return elt.NODE_ID + "" === this.code
                })
            },
            // 返回
            goBack(){
                const _this = this;
                _this.reloadRouter = true;
                _this.$store.commit('deleteMenu', _this);
                history.go(-1);
            },
        }
    }
</script>

<style>

</style>