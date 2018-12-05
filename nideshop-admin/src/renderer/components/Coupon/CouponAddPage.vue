<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ name: 'dashboard' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{infoForm.id ? '编辑优惠券' : '添加优惠券'}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <el-button type="primary" @click="goBackPage" icon="arrow-left">返回列表</el-button>
      </div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
          
          <el-form-item label="优惠券名称" prop="name">
            <el-input v-model="infoForm.name"></el-input>
          </el-form-item>
          <el-form-item label="type_money" prop="type_money">
            <el-input v-model="infoForm.type_money"></el-input>
          </el-form-item>
          <el-form-item label="send_type" prop="send_type">
            <el-input v-model="infoForm.send_type"></el-input>
          </el-form-item>
          <el-form-item label="min_amount" prop="min_amount">
            <el-input v-model="infoForm.min_amount"></el-input>
          </el-form-item>
          <el-form-item label="max_amount" prop="max_amount">
            <el-input v-model="infoForm.max_amount"></el-input>
          </el-form-item>
          <el-form-item label="发放开始时间" prop="send_start_date">
            <el-input v-model="infoForm.send_start_date"></el-input>
          </el-form-item>
          <el-form-item label="发放结束时间" prop="send_end_date">
            <el-input v-model="infoForm.send_end_date"></el-input>
          </el-form-item>
          <el-form-item label="有效开始时间" prop="use_start_date">
            <el-input v-model="infoForm.use_start_date"></el-input>
          </el-form-item>
          <el-form-item label="有效结束时间" prop="use_end_date">
            <el-input v-model="infoForm.use_end_date"></el-input>
          </el-form-item>
          <el-form-item label="最低消费级额度" prop="min_goods_amount">
            <el-input v-model="infoForm.min_goods_amount"></el-input>
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
  import config from '@/config/config';
  
  export default {
    data() {
      return {
        infoForm: {
          id: 0,
          name: '',
        },
        infoRules: {
          name: [
            { required: true, message: '请输入优惠券名称', trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      goBackPage() {
        this.$router.go(-1);
      },
      onSubmitInfo() {
        this.$refs['infoForm'].validate((valid) => {
          if (valid) {
            this.axios.post('coupon/store', this.infoForm).then((response) => {
              if (response.data.errno === 0) {
                this.$message({
                  type: 'success',
                  message: '保存成功'
                });
                this.$router.go(-1)
              } else {
                this.$message({
                  type: 'error',
                  message: '保存失败'
                })
              }
            })
          } else {
            return false;
          }
        });
      },
      getInfo() {
        if (this.infoForm.id <= 0) {
          return false
        }

        //加载优惠券详情
        let that = this
        this.axios.get('coupon/info', {
          params: {
            id: that.infoForm.id
          }
        }).then((response) => {
          let resInfo = response.data.data;
          that.infoForm = resInfo;
        })
      }

    },
    components: {
    },
    mounted() {
      this.infoForm.id = this.$route.query.id || 0;
      this.getInfo();
      console.log(config)
    }
  }

</script>
