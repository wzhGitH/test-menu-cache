<template>
    <div class="cache_menu_box clear-float" ref="menubox">
        <div class="nav_btn nav_btn_left" @click="listGoLeft()">
            <i class="el-icon-d-arrow-left"></i>
        </div>
        <div class="cache_menu_list" :style="menuStyle" ref="menuList">
            <div class="cache_menu_item" :class="{ 'active_cache_menu': item.fullPath == menuActive }" v-for="(item, index) in menuList" :key="item.fullPath" @click="jumpLink($event, item)">
                <span class="padding_right">{{ item.meta.title }}</span>
                <span v-if="menuList.length > 1" class="close_menu" title="关闭"  @click="closeRouter($event, item, index)">
                    <i class="el-icon-error"></i>
                </span>
            </div>
        </div>
        <div class="nav_btn nav_btn_right" @click="listGoRight()">
            <i class="el-icon-d-arrow-right"></i>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                menuActive: "",
                boxWidth: 0,
                listWidth: 0,
                scrollWidth: 0,
                scrollLeft: 0,
                reloadRouter: false
            }
        },
        computed: {
            // 菜单列表
            menuList(){
                let list = this.$store.state.menus.cacheList;
                return list
            },
            // 变换选中
            changeMenu () {
                let active = this.$store.state.menus.menuActive;
                return active;
            },
            // 菜单margin-left
            menuStyle(){
                return {"margin-left": this.scrollLeft + "px"};
            }
        },
        watch: {
            $route(newV){
                const _this = this;
                if(newV.meta.keepAlive){
                    // 路由发生更改
                    let menuMap = _this.$store.state.menus.menuMap;
                    let path = newV.path;
                    let item = menuMap.get(path)
                    if(item){
                        // 修改面包屑
                        _this.$store.commit('changeBreadcrumb', item);
                    };
                    _this.$store.commit('checkRouterLink', newV);
                    this.getMenuWH();
                }
            },
            changeMenu(newV){
                // 监听activetab以实现点击左侧栏时激活已存在的标签
                if (newV.fullPath !== this.menuActive) {
                    this.menuActive = newV.fullPath;
                    setTimeout(() => {
                        this.setRouterMenuLeft();
                    }, 0);
                }
            },
            menuList(newV){
                const _this = this;
                this.$nextTick(function(){
                    // 监听itemList渲染完成
                    setTimeout(() => {
                        _this.getMenuWH();
                        _this.setRouterMenuLeft();
                    }, 0);
                })
            }
        },
        mounted(){
            const _this = this;
            let route = this.$route;
            if(route.meta.keepAlive){
                _this.$store.commit('checkRouterLink', route);
            }
        },
        methods: {
            // 左移
            listGoLeft(){
                this.scrollLeft = this.scrollLeft + 200;
                this.scrollLeft = this.scrollLeft < 0 ? this.scrollLeft : 0;
            },
            // 右移
            listGoRight(){
                if(this.scrollLeft > this.scrollWidth){
                    this.scrollLeft = this.scrollLeft - 200;
                    this.scrollLeft = this.scrollLeft >= this.scrollWidth ? this.scrollLeft : this.scrollWidth;
                }
            },
            // 获取初始化宽高
            getMenuWH(){
                let menuBox = this.$refs.menubox;
                let menuList = this.$refs.menuList;
                this.boxWidth = menuBox.offsetWidth;
                this.listWidth = menuList.offsetWidth;
                this.scrollWidth = this.boxWidth - this.listWidth - 72;
                if(this.scrollWidth > 0) this.scrollLeft = 0;
            },
            // close menu
            closeRouter(e, item, index){
                const _this = this;
                e.stopPropagation();
                _this.index = index;
                if(_this.menuActive === item.fullPath){
                    if(index !== 0){
                        let urlLink = _this.menuList[index - 1].fullPath
                        _this.$router.push({ path: urlLink });
                        _this.menuActive = urlLink;
                    } else{
                        if(_this.menuList.length > 1){
                            let urlLink = _this.menuList[index + 1].fullPath
                            _this.$router.push({ path: urlLink });
                            _this.menuActive = urlLink;
                        }
                    }
                }
                _this.$store.commit('delMenu', index);
                _this.$store.commit('dropCache', _this);
            },
            // 点击缓存menu
            jumpLink(event, item){
                const _this = this;
                if(event.target.className === "close_menu") return;
                if(event.target.className === "padding_right"){
                    let e = event.target.parentElement;
                    _this.setMenuLeft(e, item);
                } else {
                    let e = event.target;
                    _this.setMenuLeft(e, item);
                }
                _this.$router.push({ path: item.fullPath });
            },
            // 设置menu list移动距离
            setMenuLeft(event, item){
                let offLeft = event.offsetLeft;
                let width = event.className === "padding_right" ? event.parentElement.offsetWidth : event.className && event.className.indexOf("cache_menu_item") >= 0 ? event.offsetWidth : 0;
                if(offLeft === 0){
                    this.scrollLeft = 0;
                } else{
                    let boxWidth = this.boxWidth;
                    let lastLeft = boxWidth - 72;
                    let distanceLeft = offLeft + width;
                    let cha = lastLeft - distanceLeft;
                    if(cha < 0){
                        this.scrollLeft = cha;
                    } else{
                        if(this.scrollLeft < 0) {
                            let nowLeft = 0 - this.scrollLeft;
                            // 判读不在可视范围内
                            if(nowLeft >= offLeft) this.scrollLeft = 0 - offLeft;
                        }
                    }
                }
            },
            setRouterMenuLeft(){
                let menuList = this.$refs.menuList;
                let childList = menuList.children;
                let lastChild = {};
                if(Array.isArray(childList)){
                    lastChild = childList.find(element => {
                        return element.className.indexOf("active_cache_menu") >= 0;
                    });
                    this.setMenuLeft(lastChild, {});
                }
                
            }
        }
    }
</script>

<style>
    .cache_menu_box{
        position: relative;
        width: 100%;
        background: #fff;
        padding: 0 36px;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: flex;
        overflow: hidden;
    }
    .cache_menu_item{
        position: relative;
        padding: 10px 12px;
        height: 41px;
        display: inline-block;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        transition: all 0.3s;
        vertical-align: middle;
        user-select: none;
        color: #333;
        background-color: #fff;
        transition: all 0.2s ease-out 0s;
    }
    .cache_menu_item:hover{
        background-color: #e5ecf7;
        color: #6e7db1;
    }
    
    .cache_menu_item:hover.cache_menu_item:after{
        transform: none;
    }
    .cache_menu_item::after{
        content: "";
        border-bottom: 2px solid #6e7db1;
        display: block;
        width: 100%;
        transition: all 0.2s ease-out 0s;
        transform: scaleX(0);
        position: absolute;
        bottom: 0;
        left: 0;
    }
    .active_cache_menu.cache_menu_item{
        background-color: #e5ecf7;
        color: #6e7db1;
    }
    .active_cache_menu.cache_menu_item::after{
        transform: none;
    }
    .nav_btn{
        position: absolute;
        top: 0;
        bottom: 0;
        padding: 10px;
        height: 41px;
        cursor: pointer;
        background: #fff;
        transition: all 0.3s;
        z-index: 1;
    }
    .nav_btn i{
        font-size: 16px;
        vertical-align: middle;
    }
    .nav_btn:hover{
        background-color: #6e7db1;
        color: #fff;
    }
    .nav_btn_left{
        left: 0;
    }
    .nav_btn_right{
        right: 0;
    }
    .cache_menu_list{
        position: relative;
        transition: all 0.2s;
    }
</style>