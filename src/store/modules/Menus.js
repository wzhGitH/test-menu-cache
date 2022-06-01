const state = {
    // 打开的tab标签页对象
    cacheList: [],
    menuList: [],
    menuActive: {},
    isMenuNodeExist: null,
    isMenuExist: null,
    fatherMenu: {},
    childmenu: {},
    isReload: false,
    reloadRouter: false,
    menuMap: new Map()
};
export default {
    state,
    mutations: {
        // 修改刷新router
        initRouter(state){
            state.reloadRouter = false;
        },
        // 更新状态
        updateState(state){
            state.isReload = !state.isReload;
        },
        // 加入list
        addCacheMenu (state, item) {
            state.cacheList.push(item);
            this.commit('openCacheMenu', item)
        },
        // 缓存菜单的键值对
        setMenuMap(state, menuMap){
            state.menuMap = menuMap;
        },
        // open Menu
        openCacheMenu (state, item) {
            state.menuActive = item;
        },
        // 删除menu
        delMenu(state, index){
            state.cacheList.splice(index, 1);
        },
        deleteMenu(state, _this){
            let url = _this.$route.fullPath;
            let index =  state.cacheList.findIndex((item)=>{
                return item.fullPath === url;
            });
            state.reloadRouter = false;
            if(index !== -1){
                state.cacheList.splice(index, 1);
                _this._deleteType = "view";
                this.commit('dropCache', _this)
            }
        },
        // 判断Menu是否存在
        isMenuExist(state, url){
            let isExist =  state.cacheList.some((item)=>{
                return item.fullPath === url;
            });
            state.isMenuExist = isExist;
        },
        isMenuListExist(state, nodeId){
            let isExist =  state.menuList.some((item)=>{
                return item.NODE_ID === nodeId;
            });
            state.isMenuNodeExist = isExist;
        },
        // 变更面包屑
        changeBreadcrumb(state,item){
            if(item.menuType === "child") {
                state.childmenu = item;
                sessionStorage.setItem("childmenu", JSON.stringify(item));
            }
            if(item.menuType === "father"){
                state.fatherMenu = item;
                state.childmenu = {};
                sessionStorage.setItem("menu", JSON.stringify(item));
                sessionStorage.removeItem("childmenu");
            }
            this.commit('isMenuListExist', item.NODE_ID);
            if (!state.isMenuNodeExist) {
                state.menuList.push(item);
            }
        },
        // 变更路由
        checkRouterLink(state, item){
            let url = item.fullPath;
            this.commit('isMenuExist', url);
            if (!state.isMenuExist) {
                // 该标签当前没有打开
                this.commit('addCacheMenu', item)
            } else {
                // 该标签是已经打开过的，需要激活此标签页
                this.commit('openCacheMenu', item)
            }
        },
        // 删除缓存
        dropCache(state, _this){
            state.reloadRouter = _this.reloadRouter ? _this.reloadRouter : false;
            let children = "";
            // 页面内的返回或关闭按钮
            if(_this._deleteType === "view"){
                children = _this;
            // 上面cahcheMenu 的关闭
            } else {
                let cacheList = state.cacheList;
                let comIndex = cacheList.length - _this.index;
                children = _this.$parent.$children[_this.$parent.$children.length - comIndex - 1];
            }
            console.log(children.$vnode);
            let key = children.$vnode.key;
            let cache = children.$vnode.parent.componentInstance.cache;
            let keys = children.$vnode.parent.componentInstance.keys;
            if (cache[key]){
                if (keys.length) {
                    var index = keys.indexOf(key);
                    if (index > -1) {
                        keys.splice(index, 1);
                    }
                }
                delete cache[key];
            }
            children.$destroy();
        },
        // 初始化所有缓存
        clearAllValue(state, item){
            state.cacheList = [];
            state.menuList = [];
            state.menuActive = {};
            state.isMenuNodeExist = null;
            state.isMenuExist = null;
            state.reloadRouter = false;
            state.fatherMenu = {};
            state.childmenu = {};
            sessionStorage.removeItem("menu");
            sessionStorage.removeItem("childmenu");
        }
    },
};
