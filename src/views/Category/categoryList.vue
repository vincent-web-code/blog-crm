<template>
	<div>
		<h1>分类列表</h1>
		<el-table :data="categroyList" v-loading="loading" border height="619px">
			<el-table-column prop="_id" label="ID" width="240"></el-table-column>
			<el-table-column prop="name" label="分类名称"></el-table-column>

			<el-table-column fixed="right" label="操作" width="180">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
					<el-button type="text " size="small" @click="remove(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination
			class="pagination-wrap"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="page"
			:page-sizes="[10, 25, 50, 100]"
			:page-size="size"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total">
		</el-pagination>
	</div>
</template>


<script lang="ts">
import{ Component, Vue } from 'vue-property-decorator';

@Component
export default class CategroyList extends Vue{
	private loading: boolean = false;
	private categroyList: Array<object> = [];
	private page: number = 1;
	private size: number = 10;
	private total: number = 0;

	private created() {
		this.page = this.$store.state.categoryPage || this.page;
		this.size = this.$store.state.categorySize || this.size;
		this.fetch();
	}

	private async fetch() {
		this.loading = true;
		let params = {
			page: this.page,
			size: this.size
		}
		let { list, total } = await this.$http.get('categories', { params } );
		this.categroyList = list;
		this.total = total;
		this.loading = false;
	}

	private remove(row: any): void {
		this.$confirm(`是否删除分类“${row.name}”？`, '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(async() => {
			await this.$http.delete(`categories/${row._id}`)
			this.$message.success('删除成功！');
			this.fetch();
		}).catch(() => {
			//@typescript-eslint/no-empty-function
		});
	}

	private handleCurrentChange(page: number): void {
		this.page = page;
		this.$store.commit('SET_CATEGRORY_PAGE', this.page)
		this.fetch();
	}

	private handleSizeChange(size: number): void {
		this.size = size;
		this.$store.commit('SET_CATEGRORY_PAGE', this.size)
		this.fetch();
	}
}
</script>


<style lang="scss" scoped>
.pagination-wrap {
	margin-top: 20px;
	text-align: center;
}
</style>