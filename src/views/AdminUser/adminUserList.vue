<template>
	<div>
		<h1>管理员列表</h1>
		<el-table :data="adminUserList" v-loading="loading" border height="619px">
			<el-table-column prop="_id" label="ID" width="240"></el-table-column>
			<el-table-column prop="username" label="用户名"></el-table-column>

			<el-table-column fixed="right" label="操作" width="180">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="$router.push(`/adminUser/edit/${scope.row._id}`)">编辑</el-button>
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
export default class AdminUserList extends Vue{
	private loading: boolean = false;
	private adminUserList: Array<object> = [];
	private page: number = 1;
	private size: number = 10;
	private total: number = 0;

	private created() {
		this.page = this.$store.state.adminUserPage || this.page;
		this.size = this.$store.state.adminUserSize || this.size;
		this.fetch();
	}

	private async fetch() {
		this.loading = true;
		let params = {
			page: this.page,
			size: this.size
		}
		let { list, total } = await this.$http.get('adminUser', { params } );

		this.adminUserList = list;
		this.total = total;
		
		this.loading = false;
	}

	private remove(row: any): void {
		this.$confirm(`是否删除“${row.username}”管理员？`, '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(async() => {
			await this.$http.delete(`adminUser/${row._id}`)
			this.$message.success('删除成功！');
			this.fetch();

		}).catch(() => {
			//@typescript-eslint/no-empty-function
		});
	}

	private handleCurrentChange(page: number): void {
		this.page = page;
		this.$store.commit('SET_ADMINUSER_PAGE', this.page)
		this.fetch();
	}

	private handleSizeChange(size: number): void {
		this.size = size;
		this.$store.commit('SET_ADMINUSER_SIZE', this.size)
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