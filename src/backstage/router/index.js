import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';            // 路由配置
import guard from './guard';              // 路由守卫

// 1 创建路由实例前必须先use
// 2 创建路由实例, 配置routes
// 3 注册路由守卫
Vue.use(VueRouter);
const vueRouter = new VueRouter({ routes });
//vueRouter.beforeEach(guard);

// 导出路由实例
export default vueRouter;
