<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ name: 'dashboard' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
        <el-breadcrumb-item>{{infoForm.id ? '编辑评论' : '添加评论'}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <el-button type="primary" @click="goBackPage" icon="arrow-left">返回列表</el-button>
      </div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
          
          <el-form-item label="商品ID" prop="value_id">
            <el-input v-model="infoForm.value_id" :disabled="true"></el-input>
            <div class="form-tip"></div>
          </el-form-item>
          <el-form-item label="评论内容" prop="content">
            <el-input type="textarea" v-model="infoForm.content" :rows="10"></el-input>
            <div class="form-tip"></div>
          </el-form-item>
          <el-form-item label="用户ID" prop="user_id">
            <el-input v-model="infoForm.user_id"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-input v-model="infoForm.status" :disabled="true"></el-input>
            <div class="form-tip">0:审核中;1:已显示;-1:拒绝</div>
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
          content: '',
        },
        infoRules: {
          content: [
            { required: true, message: '请输入评论内容', trigger: 'blur' },
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
            this.axios.post('comment/store', this.infoForm).then((response) => {
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

        //加载评论详情
        let that = this
        this.axios.get('comment/info', {
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
