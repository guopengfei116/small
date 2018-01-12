import axios from 'axios';
import api from 'backstage/js/api-config.js';

// 导出一个全局的路由守卫对象
export default function(to, from, next) {

    // 请求接口判断当前是否处于登陆状态
    axios.get(api.isLogin).then(rsp => {
        let logined = rsp.data.code == 'logined';

        // 跳转到非登陆页面
        // 1 如果已登陆那么正常跳转
        // 2 如果未登陆那么跳转到登陆页
        if(to.name !== 'l') {
            if(logined) {
                next();
            }else {
                next('/login');
            }
        }

        // 跳转到登陆页面
        // 1 如果已注销那么正常跳转
        // 2 如果未注销那么跳转到首页
        if(to.name === 'l') {
            if(!logined) {
                next();
            }else {
                next('/');
            }
        }

    });

};
