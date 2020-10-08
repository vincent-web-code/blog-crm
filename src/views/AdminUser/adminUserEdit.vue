<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名" >
        <el-input v-model="model.username"></el-input>
      </el-form-item>
			<el-form-item label="密码" >
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
			<el-form-item>
				<el-button type="primary" native-type="submit">保存</el-button>
				<el-button @click="$router.go(-1)">返回</el-button>
			</el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class AdminUserEdit extends Vue {
	private model: any = {};

	@Prop() private id!: string | null;

	@Watch("$route")
	changeRoute(newVal: any, oldVal: any) {
		if (!this.id) this.$set(this.model, 'username', '');
		if (!this.id) this.$set(this.model, 'password', '');
	}

	private created() {
		this.id && this.fetch();
	}
	public async save() {
		if (!this.model.username) {
			return this.$message.error('请输入用户名！')
		}
		if (!this.model.password) {
			return this.$message.error('请输入密码！')
		}
		if (this.id) {  // 编辑
			await this.$http.put(`adminUser/${this.id}`, this.model);
			this.$message.success(`修改“${this.model.username}”管理员成功！`)
		} else {  // 新建
			await this.$http.post('adminUser', this.model);
			this.$message.success(`新建“${this.model.name}”管理员成功！`)

		}
		this.$router.push('/adminUser/list');
		
	}

	public async fetch() {
		let { username, password } = await this.$http.get(`adminUser/${this.id}`);
		this.$set(this.model, 'username', username);
		this.$set(this.model, 'password', password);
	}
}
</script>

<style lang="" scoped></style>
