const Service = {
    reformMenuList(obj, fnode) {
        let gen = [];
        for (let i = 0; i < obj.length; i++) {
            let branch = obj[i];
            if (branch.F_NODE == fnode) {
                gen.push(branch);
                branch["children"] = this.buildTree(obj, branch);
            }
        }
        return gen;
    },
    buildTree(obj, parentNode) {
        let tree = new Array();
        for (let i = 0; i < obj.length; i++) {
            let children = obj[i];
            if (children.F_NODE == parentNode.NODE_ID) {
                tree.push(children);
                children["children"] = this.buildTree(children);
            }
        }
        return tree;
    },
    // 获取菜单id
    getMenuIds(){ 
        return sessionStorage.getItem("menu");
    },
    // 获取子菜单id
    getChildMenuIds(){ 
        return sessionStorage.getItem("childmenu");
    }
}
export default Service;