<template>
    <div class="login">

        <!-- 居中的容器 -->
        <div class="login_content">

            <!-- Title -->
            <div class="login_content_title">
                &nbsp;&nbsp;&nbsp;&nbsp;后台管理
            </div>

            <!-- Form表单: 如果需要表单效验与重置功能, 需要设置model属性为整个表单数据 -->
            <el-form class="login_content_form" :model="user" :rules="loginFormRules"
                status-icon ref="ruleLoginForm" label-width="70px" label-position="left" >

                <!-- 用户名: 表单效验与重置, 需要设置prop属性为表单字段 -->
                <el-form-item label="用户名" prop="uname">
                    <!-- 用户名输入框: 这里的v-model记得关联表单字段 -->
                    <el-input type="password" v-model="user.uname" auto-complete="off"></el-input>
                </el-form-item>

                <!-- 密码: 表单效验与重置, 需要设置prop属性为表单字段 -->
                <el-form-item label="密码" prop="upwd">
                    <!-- 密码输入框: 这里的v-model记得关联表单字段 -->
                    <el-input type="password" v-model="user.upwd" auto-complete="off"></el-input>
                </el-form-item>

                <!-- 按钮 -->
                <el-form-item>
                    <el-button @click="submitForm('ruleLoginForm')">提交</el-button>
                    <el-button @click="resetForm('ruleLoginForm')">重置</el-button>
                </el-form-item>

            </el-form>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {
                    uname: "admin",
                    upwd: "123456"
                },
                loginFormRules: {
                    uname: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { pattern: /\w{4,18}/, message: '长度在 4 到 18 个字符, 且只能为字母或数字', trigger: 'blur' }
                    ],
                    upwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { pattern: /.{6,18}/, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                    ]
                }
            };
        },

        methods: {

            // 登陆
            // 1 发送ajax请求
            // 2 成功后判断status是否为0, 不为0给出错误提示
            // 3 如果为0, 说明登陆成功, 本地localStorage存储后端返回的用户信息
            // 4 跳转到后台管理首页
            login() {
                this.$http.post(this.$api.login, this.user).then(rsp => {

                    // 解构赋值的方式提取两个属性
                    let {status, message} = rsp.data;

                    if(status == 0) {
                        localStorage.setItem('user', JSON.stringify(message)); // 需要转换为字符串存储
                        this.$router.push('/');
                    }else {
                        alert('哥们你确实逗我呢!')
                    }

                });
            },

            // 表单提交
            // 1 先做表单校验
            // 2 校验通过后调用login方法进行登陆
            // 3 校验不通过给出提示
            submitForm(formName) {
                this.$refs[formName].validate((result) => {
                    if(result) {
                       this.login();
                    }else {
                        this.$alert('哥们你逗我呢!')
                    }
                });
            },

            // 重置表单
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped lang="less">
    .login {
        height: 100%;
        background-color: rgb(38, 124, 183);
        text-align: center;

        &_content {
            width: 400px;
            position: relative;
            top: 50%;
            transform: translateY(-70%);
            margin: 0 auto;

            &_title {
                margin-bottom: 22px;
                font-size: 26px;
                color: #FFF;
            }
        }
    }
</style>
