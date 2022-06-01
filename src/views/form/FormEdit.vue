<template>
    <div class="content_wrap">
        <div class="animation_content content_block">
            <div class="search_box clear-float">
                <div class="search_title">{{ routerTitle }}</div>
            </div>
            <div class="add_body" v-loading="isGetLoading">
                <el-row>
                    <el-col :span="24" class="padding_bottom">
                        <label class="el-col-8 control-label eletRe_hint">菜单ID<span class="redColor">*</span></label>
                        <div class="el-col-16 form_content">
                            <input type="text" class="input_public_max" v-model="itemInfo.NODE_ID" placeholder="菜单ID"/>
                        </div>
                    </el-col>
                    <el-col :span="24" class="padding_bottom">
                        <label class="el-col-8 control-label eletRe_hint">菜单名称<span class="redColor">*</span></label>
                        <div class="el-col-16 form_content">
                            <input type="text" class="input_public_max" v-model="itemInfo.MENU_NAME" placeholder="菜单名称"/>
                        </div>
                    </el-col>
                    <el-col :span="24" class="padding_bottom">
                        <label class="el-col-8 control-label eletRe_hint">菜单图标</label>
                        <div class="el-col-16 form_content">
                            <input type="text" class="input_public_max" v-model="itemInfo.PIC_ICON" placeholder="菜单图标"/>
                        </div>
                    </el-col>
                    <el-col :span="24" class="padding_bottom">
                        <label class="el-col-8 control-label eletRe_hint">菜单链接</label>
                        <div class="el-col-16 form_content">
                            <input type="text" class="input_public_max" v-model="itemInfo.URL_LINK" placeholder="菜单链接"/>
                        </div>
                    </el-col>
                    <el-col :span="24" class="padding_bottom">
                        <label class="el-col-8 control-label eletRe_hint">所属模块</label>
                        <div class="el-col-16 form_content">
                            <input type="text" class="input_public_max" v-model="itemInfo.BELONG_MODULE" placeholder="所属模块"/>
                        </div>
                    </el-col>
                    <el-col :span="24" class="padding_bottom">
                        <label class="el-col-8 control-label eletRe_hint">排序</label>
                        <div class="el-col-16 form_content">
                            <input type="text" class="input_public_max" v-model="itemInfo.SORT" placeholder="排序"/>
                        </div>
                    </el-col>
                    <el-col :span="24" class="padding_bottom">
                        <label class="el-col-8 eletRe_hint">是否可以点击</label>
                        <div class="el-col-16 radio_content">
                            <el-radio v-model="itemInfo.IS_CLICK" label="1">是</el-radio>
                            <el-radio v-model="itemInfo.IS_CLICK" label="2">否</el-radio>
                        </div>
                    </el-col>
                    <el-col :span="24" class="padding_bottom">
                        <label class="el-col-8 eletRe_hint">是否是应用</label>
                        <div class="el-col-16 radio_content">
                            <el-radio v-model="itemInfo.IS_APP" label="1">是</el-radio>
                            <el-radio v-model="itemInfo.IS_APP" label="2">否</el-radio>
                        </div>
                    </el-col>
                </el-row>
                <div class="clear-float btn_btn_div">
                    <div class="btn_center">
                        <el-button type="primary" :loading="isLoading" @click="sureOk()">确 定</el-button>
                    </div>
                    <div class="btn_center">
                        <el-button @click="handleClose()">取 消</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                isGetLoading: false,
                itemInfo: {F_NODE: 0},
                fName: "",
                isLoading: false,
                routerTitle: "",
            }
        },
        components: {},
        mounted(){
            this.menuCode = this.$route.query.code;
        },
        methods: {
            // 返回
            handleClose(){
                history.go(-1);
            },
        }
    }
</script>

<style>

</style>