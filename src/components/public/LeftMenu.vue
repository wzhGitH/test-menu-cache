<template>
    <ul class="left_menu" :class="{ 'menu_mini': collapse }" v-loading="isGetLoading">
        <li class="child_menu" v-for="menu in menuList" :key="menu.NODE_ID">
            <div class="position_relative child_menu_content" :class="{ 'active_child': menu.NODE_ID == menuActive }"
                @click="goRouter(menu)">
                <i :class="menu.PIC_ICON"></i>
                {{ menu.MENU_NAME }}
                <i class="item-right" :class="{ 'bottom-animation': menu.showSon }" v-if="menu.children.length > 0"></i>
            </div>
            <transition name="grandson_menu_animation">
                <ul class="grandson_menu" v-if="menu.children.length > 0 && menu.showSon">
                    <li class="grandson_menu_content" @mouseover="child.hoverItem = true"
                        @mouseout="child.hoverItem = false" v-for="child in menu.children" :key="child.NODE_ID"
                        :class="{ 'active_grandson': child.NODE_ID == menuActive }" @click="goRouter(child)">
                        <div class="menu_hover_show" :class="{ 'menu_hovered': child.hoverItem }"></div>
                        <i :class="child.PIC_ICON"></i>
                        <span class="menu_name">{{ child.MENU_NAME }}</span>
                    </li>
                </ul>
            </transition>
        </li>
    </ul>
</template>

<script>
import menus from "@/assets/json/menuList.json";
export default {
    data() {
        return {
            isGetLoading: false,
            dataList: menus,
            menuList: [],
            account: "",
            collapse: false
        };
    },
    computed: {
        fCode() {
            let fatherMenu = this.$store.state.menus.fatherMenu;
            return fatherMenu ? fatherMenu.NODE_ID : 1;
        },
        menuActive() {
            let childmenu = this.$store.state.menus.childmenu;
            return childmenu ? childmenu.NODE_ID : "";
        }
    },
    watch: {
        fCode(newv) {
            this.getMenuList();
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            try {
                let fatherMenu = {
                    "NODE_ID": 1,
                    "MENU_NAME": "系统模块",
                    "PIC_ICON": "",
                    "URL_LINK": "/home",
                    "F_NODE": 0,
                    "children": [],
                    "menuType": ""
                };
                fatherMenu.menuType = "father";
                this.$store.commit('changeBreadcrumb', fatherMenu);
                this.getMenuList();
            }
            catch(e) {
                console.log(e);
                setTimeout(() => {
                    this.init();
                }, 500);
            }
        },
        // 调整
        goRouter(item) {
            if (item.children.length > 0) {
                item.showSon = !item.showSon;
            } else {
                if (item.is_click === "2") {
                    this.$message.warning("近期开放,敬请期待!");
                } else {
                    item.menuType = "child";
                    this.$store.commit('changeBreadcrumb', item);
                    // sessionStorage.setItem("childmenu", JSON.stringify(item));
                    // this.menuActive = item.NODE_ID;
                    this.$router.push({ path: item.URL_LINK });
                }
            }
        },
        // 获取菜单
        getMenuList() {
            let _this = this;
            let path = _this.$route.fullPath;
            let faNode = 0;
            let oldMenu = this.Service.getChildMenuIds();
            let menuMap = new Map();
            this.dataList.forEach((elt) => {
                elt.children = [];
                elt.hoverItem = false;
                if (oldMenu === elt.NODE_ID) {
                    faNode = elt.F_NODE;
                    elt.menuType = "child";
                    sessionStorage.setItem("childmenu", JSON.stringify(elt));
                    _this.$store.commit('changeBreadcrumb', elt);
                } else {
                    if (path === elt.URL_LINK && elt.F_NODE) {
                        elt.menuType = "child";
                        sessionStorage.setItem("childmenu", JSON.stringify(elt));
                        _this.$store.commit('changeBreadcrumb', elt);
                        faNode = elt.F_NODE;
                    }
                }
                elt.showSon = false;
                menuMap.set(elt.URL_LINK, elt);
            });
            let menuList = _this.reformMenu(this.dataList, faNode);
            _this.menuList = this.Service.reformMenuList(menuList, _this.fCode);
            // 将菜单的键值对缓存起来
            _this.$store.commit('setMenuMap', menuMap);
        },
        reformMenu(dataList, id) {
            dataList.forEach((elt) => {
                if (elt.NODE_ID === id) elt.showSon = true;
            })
            return dataList;
        }
    }
};
</script>

<style>
.left_menu {
    min-height: 100%;
    width: 200px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    background-color: #eaedf2;
    color: #333;
    overflow-x: hidden;
    overflow-y: auto;
    transition: width 0.3s ease-in-out;
}

.menu_mini {
    width: 64px;
}

.btn_collapse_div {
    position: absolute;
    color: #e8ecf0;
    left: 0;
    right: 0;
    bottom: 0;
}

.btn_collapse {
    background: #0f1012;
}

.btn_collapse i {
    display: block;
    cursor: pointer;
    transition: all 0.3s;
    padding: 14px 16px;
    background: #0f1012;
    width: 64px;
    text-align: center;
}

.btn_collapse i:hover {
    color: #42aafa;
}
</style>
