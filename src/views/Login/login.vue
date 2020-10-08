<template>
    <div class="login-container">
        <el-card header="请先登录" class="login-card">
            <el-form @submit.native.prevent="login">
                <el-form-item label="用户名">
                    <el-input v-model="model.username"></el-input>
                </el-form-item>

                <el-form-item label="密码">
                    <el-input type="password" v-model="model.password"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" native-type="submit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>


<script lang="ts">
import{ Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue{
    private model: any = {};

    private async login() {
        if (!this.model.username) {
            return this.$message.error('请输入用户名');
        }
        if (!this.model.password) {
            return this.$message.error('请输入密码');
        }
        let { token, username } = await this.$http.post('login', this.model);
        localStorage.token = token;
        localStorage.adminUserName = username;
        this.$message.success('登录成功！');
        this.$router.push('/');
    }
}
</script>


<style lang="scss" scoped>
.login-card {
    width: 25rem;
    margin: 6rem auto;
}
</style>