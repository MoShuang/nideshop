<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ name: 'dashboard' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{infoForm.id ? '编辑首页分类' : '添加首页分类'}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <el-button type="primary" @click="goBackPage" icon="arrow-left">返回列表</el-button>
      </div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
          <el-form-item label="分类名" prop="name">
            <el-input v-model="infoForm.name"></el-input>
          </el-form-item>
          <el-form-item label="跳转链接" prop="url">
            <el-input v-model="infoForm.url"></el-input>
          </el-form-item>

          <el-form-item label="Icon图片" prop="icon_url">
            <input type="file" id="file" style="display:none;" @change="sendFile">
            <label style="width:150px;height:100px;border:1px solid gray;display: flex;" for="file">
              <img
                v-if="infoForm.icon_url"
                :src="infoForm.icon_url"
                style="margin:auto;width:100%;height:100%;"
                class="image-show"
              >
              <i v-else class="el-icon-plus image-uploader-icon" style="margin:auto;"></i>
            </label>
            <div class="form-tip">图片尺寸：1440*800</div>
          </el-form-item>
          <!-- 引用网络图片辅助-->
          <el-form-item label="Icon图片清除辅助" class="item-icon-image-fuzhu">
            <el-input class="icon-image-fuzhu" v-model="infoForm.icon_url"></el-input>
            <el-button type="primary" @click="onClearIconUrl">清除</el-button>
            <div class="form-tip">清除Icon图片辅助工具，Icon图片不填则不显示图片</div>
          </el-form-item>
          <el-form-item label="排序" prop="sort_order">
            <el-input-number v-model="infoForm.sort_order" :min="1" :max="1000"></el-input-number>
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
import upyun from '@/utils/upyun'
export default {
  data() {
    return {
      infoForm: {
        id: 0,
        name: "",
        url: "",
        icon_url: ""
      },
      infoRules: {
        name: [
          { required: true, message: "请输入首页分类名称", trigger: "blur" }
        ],
        url: [{ required: true, message: "请输入图片url", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 清除Icon图标
    onClearIconUrl() {
      document.querySelector(".icon-image-fuzhu input").value = "";
      this.infoForm.icon_url = "";
    },
    goBackPage() {
      this.$router.go(-1);
    },
    onSubmitInfo() {
      this.$refs["infoForm"].validate(valid => {
        if (valid) {
          this.axios.post("channel/store", this.infoForm).then(response => {
            if (response.data.errno === 0) {
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.$router.go(-1);
            } else {
              this.$message({
                type: "error",
                message: "保存失败"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    sendFile({ target }) {
      if (!target.files || target.files.length == 0) {
        return;
      }
      const loading = this.$loading("上传中...");
      upyun.uploadChannelPic(target.files[0]).then(res => {
        this.$set(this.infoForm, "icon_url", res.data.url);
        loading.close()
      });
    },
    getInfo() {
      if (this.infoForm.id <= 0) {
        return false;
      }

      //加载广告详情
      let that = this;
      this.axios
        .get("channel/info", {
          params: {
            id: that.infoForm.id
          }
        })
        .then(response => {
          let resInfo = response.data.data;
          that.infoForm = resInfo;
        });
    }
  },
  components: {},
  mounted() {
    this.infoForm.id = this.$route.query.id || 0;
    this.getInfo();
  }
};
</script>

<style>
.item-icon-image-fuzhu .el-input {
  width: 260px;
}
</style>
