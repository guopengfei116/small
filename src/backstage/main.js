// 1.1 导入全局样式
import 'normalize.css';
import './less/index.less';

// 2.1 导入Vue相关第三方库
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 2.2 启动Vue插件
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ElementUI);

// 3.1 导入和Vue不相关的库或模块
import axios from './js/axios-config.js';
import api from './js/api-config.js';

// 3.2 注入到Vue原型方便使用
Vue.prototype.$http = axios;
Vue.prototype.$api = api;

// 4.1 导入根组件
import AppComponent from './component/App.vue';

// 4.2 导入路由实例
import vueRouter from './router';

// 渲染根组件, 运行项目
new Vue({
    el: '#app',
    render: c => c(AppComponent),
    router: vueRouter
});
