<template>
    <div>
        <h1>评论列表</h1>
		<el-table :data="commentList" v-loading="loading" border height="619px">
			<el-table-column prop="_id" label="ID" width="240"></el-table-column>
			<el-table-column prop="name" label="所属文章"></el-table-column>

			<el-table-column fixed="right" label="操作" width="180">
				<template slot-scope="scope">
					<el-button type="text" size="small" @click="$router.push(`/categories/edit/${scope.row._id}`)">查看</el-button>
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
export default class CommentList extends Vue{
    private loading: boolean = false;
	private commentList: Array<object> = [];
	private total: number = 0;
    private page: number = 1;
    private size: number = 10;


    private handleSizeChange(size: number): void {
        // @typescript-eslint/no-empty-function
    };

    private handleCurrentChange(page: number): void {
        // @typescript-eslint/no-empty-function
    };

    private remove(row: any): void {
        // @typescript-eslint/no-empty-function
    }
}
</script>


<style lang="scss" scoped>
.pagination-wrap {
    text-align: center;
    margin-top: 20px;
}
</style>