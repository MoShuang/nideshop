<template>
    <div class="content-page">
        <div class="content-nav">
            <el-breadcrumb class="breadcrumb" separator="/">
                <el-breadcrumb-item :to="{ name: 'dashboard' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>订单管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{infoForm.id ? '订单详情' : '添加订单'}}</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="operation-nav">
                <el-button type="primary" @click="goBackPage" size="small" icon="arrow-left">返回列表</el-button>
            </div>
        </div>
        <div class="content-main">
            <div class="form-table-box" v-loading="pageLoading" element-loading-text="拼命加载中">
                <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
                    <el-form-item label="订单编号" prop="order_sn">
                        <el-input v-model="infoForm.order_sn"></el-input>
                    </el-form-item>
                    <el-form-item label="用户编号" prop="user_id">
                        <el-input v-model="infoForm.user_id"></el-input>
                    </el-form-item>
                    <el-form-item label="订单状态" prop="order_status">
                        <el-input v-model="infoForm.order_status"></el-input>
                        <div class="form-tip"></div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmitInfo">确定保存</el-button>
                        <el-button @click="goBackPage">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageLoading: false,
                infoForm: {
                    id: 0,
                }
            }
        },
        methods: {
            goBackPage() {
                this.$router.go(-1);
            },
            getInfo() {
                if (this.infoForm.id <= 0) {
                    return false
                }

                //加载品牌详情
                let that = this
                this.axios.get('/brand/info', {
                    params: {
                        id: that.infoForm.id
                    }
                }).then((response) => {
                    console.log(response.data);
                    let resInfo = response.data.data;
                    that.infoForm = resInfo;
                    this.pageLoading = false;
                })
            }

        },
        components: {},
        mounted() {
            console.log(this.$route.query)
            this.infoForm.id = this.$route.query.id || 0;
            this.getInfo();
        }
    }

</script>

<style>
   
</style>
