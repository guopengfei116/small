import AdminComponent from 'backstage/component/admin/Admin.vue';
import LoginComponent from 'backstage/component/login/Login.vue';

// 子路由
//import goodsRoutes from './goods.js';
//const adminChildrenRoutes = [...goodsRoutes];
const adminChildrenRoutes = [];

// 导出路由配置
export default [

    // 首页
    { path: "/", redirect: "/admin" },
    { name: "admin", path: "/admin", component: AdminComponent, adminChildrenRoutes },

    // 登陆
    { name: "login", path: "/login", component: LoginComponent },

];
