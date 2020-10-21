<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">

			<el-form-item label="分类">
				<el-select 
					v-model="model.category"
					filterable
					multiple
					:multiple-limit='5'
					placeholder="请选择分类"
					style="width: 100%;"
				>
					<el-option
						v-for="item in categoryList"
						:key="item._id"
						:label="item.name"
						:value="item._id">
					</el-option>
				</el-select>
			</el-form-item>

      <el-form-item label="标题" >
				<el-input v-model="model.title" placeholder="请输入标题"></el-input>
      </el-form-item>

			<el-form-item label="内容" >
				<vue-editor v-model="model.content"></vue-editor>
      </el-form-item>

			<el-form-item>
				<el-button type="primary" native-type="submit">保存</el-button>
				<el-button @click="$router.go(-1)">返回</el-button>
			</el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { VueEditor } from "vue2-editor";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
	components: {
		VueEditor
	}
})
export default class CategoryEdit extends Vue {
	private model: any = {};
	private categoryList: Array<object> = [];

	@Prop() private id!: string | null;

	@Watch("$route")
	changeRoute(newVal: any, oldVal: any) {
		if (!this.id) {
			this.$set(this.model, 'category', []);
			this.$set(this.model, 'title', '');
			this.$set(this.model, 'content', '');
		}
	}

	private async created() {
		await this.getCategory();
		this.id && this.fetch();
	}
	public async save() {
		if (!this.model.category || this.model.category.length == 0) {
			return this.$message.error('请选择分类！')
		}
		if (!this.model.title) {
			return this.$message.error('请输入标题名称！')
		}
		if (!this.model.content) {
			return this.$message.error('请输入内容！')
		}
		this.model.category = this.model.category.join(',')
		if (this.id) {  // 编辑
			await this.$http.put(`article/${this.id}`, this.model);
			this.$message.success(`修改《${this.model.title}》文章成功！`)
		} else {  // 新建
			await this.$http.post('article', this.model);
			this.$message.success(`新建成功！`)
		}
		this.$router.push('/article/list');
		
	}

	public async fetch() {
		let data = await this.$http.get(`article/${this.id}`);
		this.model = data;
		this.model.category = this.model.category.split(',')
	}

	// 获取分类列表
	async getCategory() {
		let { list } = await this.$http.get('categories');
		this.categoryList = list;
	}
}
</script>

<style lang="" scoped></style>
