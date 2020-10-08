<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称" >
			<el-input v-model="model.name"></el-input>
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
export default class CategoryEdit extends Vue {
	private model: any = {};

	@Prop() private id!: string | null;

	@Watch("$route")
	changeRoute(newVal: any, oldVal: any) {
		if (!this.id) this.$set(this.model, 'name', '');
	}

	private created() {
		this.id && this.fetch();
	}
	public async save() {
		if (!this.model.name) {
			return this.$message.error('请输入分类名称！')
		}
		if (this.id) {  // 编辑
			await this.$http.put(`categories/${this.id}`, this.model);
			this.$message.success(`修改“${this.model.name}”分类成功！`)
		} else {  // 新建
			await this.$http.post('categories', this.model);
			this.$message.success(`新建“${this.model.name}”分类成功！`)
		}
		this.$router.push('/categories/list');
		
	}

	public async fetch() {
		let res = await this.$http.get(`categories/${this.id}`);
		this.$set(this.model, 'name', res.name);
	}
}
</script>

<style lang="" scoped></style>
