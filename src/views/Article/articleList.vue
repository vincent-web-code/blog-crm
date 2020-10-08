<template>
	<div>
		<h1>文章列表</h1>

		<el-table :data="articleList" v-loading="loading" border height="619px">
			<el-table-column prop="_id" label="ID" width="240"></el-table-column>
			<el-table-column label="分类">
				<template slot-scope="scope">
					{{scope.row.categoryName.join('，')}}
				</template>
			</el-table-column>
			<el-table-column prop="title" label="标题"></el-table-column>
			<el-table-column prop="readNum" label="阅读量"></el-table-column>
			<el-table-column label="创建时间">
				<template slot-scope="scope">
					{{scope.row.createDate | filterDate}}
				</template>
			</el-table-column>

			<el-table-column fixed="right" label="操作" width="180">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="$router.push(`/article/edit/${scope.row._id}`)">编辑</el-button>
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
import { formatterDate } from '../../utils/date';
@Component({
	filters: {
		filterDate(val: string) {
			return val ? formatterDate(val) : ''
		}
	}
})
export default class ClassName extends Vue{
	private loading: boolean = false;
	private articleList: Array<object> = [];
	private page: number = 1;
	private size: number = 10;
	private total: number = 0;

	private created(): void {
		this.page = this.$store.state.articlePage || 1;
		this.size = this.$store.state.articleSize || 10;
		this.fetch();
	}

	private async fetch() {
		this.loading = true;
		let params = {
			page: this.page,
			size: this.size
		}
		let { list, total } = await this.$http.get('article', { params } );
		this.articleList = list;
		this.total = total;
		this.loading = false;
	}

	private remove(row: any): void {
		this.$confirm(`是否删除文章“${row.title}”？`, '提示', {
			confirmButtonText: '确定',
			cancelButtonText: '取消',
			type: 'warning'
		}).then(async() => {
			await this.$http.delete(`article/${row._id}`)
			this.$message.success('删除成功！');
			this.fetch();
		}).catch(() => {
			//@typescript-eslint/no-empty-function
		});
	}

	private handleSizeChange(size: any): void {
		this.size = size;
		this.$store.commit('SET_ARTICLE_SIZE', this.size)
		this.fetch();
	}

	private handleCurrentChange(page: any): void {
		this.page = page;
		this.$store.commit('SET_ARTICLE_PAGE', this.page)
		this.fetch();
	}
}
</script>


<style lang="scss" scoped>
.pagination-wrap {
	padding-top: 20px;
	text-align: center;
}
</style>