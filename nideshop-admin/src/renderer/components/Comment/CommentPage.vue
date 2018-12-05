<template>
	<div class="content-page">
		<div class="content-nav">
			<el-breadcrumb class="breadcrumb" separator="/">
				<el-breadcrumb-item :to="{ path: '/dashboard' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>数据统计</el-breadcrumb-item>
				<el-breadcrumb-item>评论列表</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="operation-nav">
				<router-link to="/dashboard/comment/add">
					<el-button type="primary" icon="plus">添加评论</el-button>
				</router-link>
			</div>
		</div>
		<div class="content-main">
			<div class="filter-box">
				<el-form :inline="true" :model="filterForm" class="demo-form-inline">
					<el-form-item label="评论">
						<el-input v-model="filterForm.name" placeholder="评论内容"></el-input>
					</el-form-item>
                    <el-form-item label="状态">
						<el-input v-model="filterForm.state" placeholder="状态"></el-input>
					</el-form-item>
                    <el-form-item label="用户ID">
						<el-input v-model="filterForm.user_id" placeholder="状态"></el-input>
					</el-form-item>
                    <el-form-item label="商品ID">
						<el-input v-model="filterForm.value_id" placeholder="状态"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmitFilter">查询</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="form-table-box">
				<el-table :data="tableData" style="width: 100%" border stripe>
					<el-table-column prop="id" label="ID" width="100px">
					</el-table-column>
					<el-table-column prop="value_id" label="商品ID">
					</el-table-column>
					<el-table-column prop="user_id" label="用户ID">
					</el-table-column>
                    <!-- <el-table-column prop="user_name" label="用户名字">
					</el-table-column> -->
                    <el-table-column prop="content" label="评论内容" show-overflow-tooltip="true">
					</el-table-column>
                    <el-table-column prop="add_time" label="评论时间">
					</el-table-column>
                    <el-table-column prop="status" label="状态">
                        <template scope="scope">
                            <el-label v-if="scope.row.status == 0">待审核</el-label>
                            <el-label v-else-if="scope.row.status == 1">已显示</el-label>
                            <el-label v-else-if="scope.row.status == -1">拒绝</el-label>
                        </template>
					</el-table-column>
					<el-table-column label="操作" width="140">
						<template scope="scope">
							<el-button size="small" @click="handleRowEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button size="small" type="danger" @click="handleRowDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div class="page-box">
				<el-pagination @current-change="handlePageChange" :current-page="page" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			page: 1,
			total: 0,
			filterForm: {
				name: ''
			},
			tableData: []
		}
	},
	methods: {
		handlePageChange(val) {
			this.page = val;
			//保存到localStorage
			localStorage.setItem('commentPage', this.page)
			localStorage.setItem('commentFilterForm', JSON.stringify(this.filterForm));
			this.getList()
		},
		handleRowEdit(index, row) {
			this.$router.push({ name: 'comment_add', query: { id: row.id } })
		},
		handleRowDelete(index, row) {

			this.$confirm('确定要删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {

				this.axios.post('comment/destory', { id: row.id }).then((response) => {
					console.log(response.data)
					if (response.data.errno === 0) {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});

						this.getList();
					}
				})


			});
		},
		onSubmitFilter() {
			this.page = 1
			this.getList()
		},
		getList() {
			this.axios.get('comment', {
				params: {
					page: this.page,
					name: this.filterForm.name
				}
			}).then((response) => {
                this.tableData = response.data.data.data
                this.page = response.data.data.currentPage
                this.total = response.data.data.count
			})
		}
	},
	components: {

	},
	mounted() {
		this.getList();
	}
}

</script>

<style scoped>

</style>
