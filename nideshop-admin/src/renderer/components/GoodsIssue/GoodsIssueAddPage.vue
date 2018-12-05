<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ name: 'dashboard' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{infoForm.id ? '编辑商品疑问' : '添加商品疑问'}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <el-button type="primary" @click="goBackPage" icon="arrow-left">返回列表</el-button>
      </div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
          
          <el-form-item label="商品ID" prop="goods_id">
            <el-input v-model="infoForm.goods_id"></el-input>
          </el-form-item>
          <el-form-item label="商品疑问" prop="question">
            <el-input v-model="infoForm.question"></el-input>
          </el-form-item>
          <el-form-item label="疑问解答" prop="answer">
            <el-input type="textarea" v-model="infoForm.answer" :rows="10"></el-input>
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
  import config from '@/config/config';
  
  export default {
    data() {
      return {
        uploaderHeader: {
          'X-Nideshop-Token': localStorage.getItem('token') || '',
        },
        infoForm: {
          id: 0,
          goods_id: '',
          question: '',
          answer: ''
        },
        infoRules: {
          goods_id: [
            { required: true, message: '请输入商品ID', trigger: 'blur' },
          ],
          question: [
            { required: true, message: '请输入商品疑问', trigger: 'blur' },
          ],
          answer: [
            { required: true, message: '请输入疑问解答', trigger: 'blur' },
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
            this.axios.post('goodsissue/store', this.infoForm).then((response) => {
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

        //加载商品疑问详情
        let that = this
        this.axios.get('goodsissue/info', {
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
