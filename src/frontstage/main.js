// 1.1 导入第三方库
import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 1.2 启动Vue插件
Vue.use(VueRouter);
Vue.use(ElementUI);

// 2.1 导入根组件
import AppComponent from './component/App.vue';

// 渲染根组件, 启动项目
new Vue({
    el: '#app',
    render: c => c(AppComponent),
});
