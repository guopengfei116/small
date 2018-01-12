import axios from 'axios';
import { domain } from './api-config.js';

// 设置ajax请求数据服务的url域名
axios.defaults.baseURL = domain;

// withCredentials配置为true表示在ajax请求中携带cookie信息，默认是false，实现服务器状态维持的关键
axios.defaults.withCredentials = true;

export default axios;
