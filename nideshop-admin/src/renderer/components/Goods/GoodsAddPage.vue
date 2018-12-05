<template>
  <div class="content-page">
    <div class="content-nav">
      <el-breadcrumb class="breadcrumb" separator="/">
        <el-breadcrumb-item :to="{ name: 'dashboard' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{infoForm.id ? '编辑商品' : '添加商品'}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="operation-nav">
        <el-button type="primary" @click="goBackPage" icon="arrow-left">返回列表</el-button>
      </div>
    </div>
    <div class="content-main">
      <div class="form-table-box">
        <el-form ref="infoForm" :rules="infoRules" :model="infoForm" label-width="120px">
          <el-form-item label="商品sn" prop="goods_sn">
            <h4 style="color:gray">{{infoForm.goods_sn}}</h4>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="infoForm.name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="retail_price">
            <el-input v-model="infoForm.retail_price" type="number"></el-input>
          </el-form-item>
          <el-form-item label="所属分类" prop="category_id">
             <el-select v-model="infoForm.category_name" value-key="id" placeholder="请选择" @change="handleSelectChage">
              <el-option
                v-for="item in infoForm.allCategory"
                :key="item.id"
                :label="item.name"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <input type="file" style="display:none;" @change="multiDocFileUpload" id="upload"/>
          <el-form-item label="商品图片" prop="list_pic_url">
              <input type="file" id="file" style="display:none;" @change="sendFile"/>
              <label style="width:150px;height:100px;border:1px solid gray;display: flex;" for="file">
                <img v-if="infoForm.list_pic_url" :src="infoForm.list_pic_url" style="margin:auto;width:100%;height:100%;" class="image-show">
                <i v-else class="el-icon-plus image-uploader-icon" style="margin:auto;"></i>
              </label>
            <div class="form-tip">图片尺寸：800*800</div>
          </el-form-item>
          <el-form-item label="商品简介" prop="goods_brief">
            <el-input type="textarea" v-model="infoForm.goods_brief" :rows="3"></el-input>
            <div class="form-tip"></div>
          </el-form-item>
          <!-- 引用网络图片辅助-->
          <el-form-item label="商品详情" prop="goods_desc">
            <div class="edit_container">
              <quill-editor v-model="infoForm.goods_desc"
                  ref="myTextEditor"
                  class="editer"
                  :options="editorOption" 
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)">
              </quill-editor>
            </div>
          </el-form-item>
          <el-form-item label="规格/库存" prop="goods_number">
            <el-input v-model="infoForm.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="推荐类型">
            <el-checkbox-group v-model="infoForm.is_new">
              <el-checkbox label="新品" name="is_new" ></el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="infoForm.is_hot">
              <el-checkbox label="人气" name="is_hot"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="上架">
            <el-switch on-text="上架" off-text="下架" on-value="1" off-value="0" v-model="infoForm.is_on_sale"></el-switch>
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
  import $ from 'jquery'
  import upyun from '@/utils/upyun'
  import { quillEditor } from 'vue-quill-editor' //调用富文本编辑器
  const toolbarOptions = [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'header': 1 }, { 'header': 2 }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'script': 'sub' }, { 'script': 'super' }],
              [{ 'indent': '-1' }, { 'indent': '+1' }],
              [{ 'direction': 'rtl' }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'font': [] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ]
  export default {
    data() {
      return {
        editorOption: {
          modules: {
            toolbar: {
              container: toolbarOptions,  // 工具栏
              handlers: {
                'image': function (value) {
                  console.log(value)
                  if (value) {
                    document.querySelector('#upload').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            },
            syntax: {
              highlight: text => hljs.highlightAuto(text).value
            }
          }
        },
        infoForm: {
          id: 0,
          name: "",
          list_pic_url: '',
          goods_brief: '',
          goods_desc: '',
          is_on_sale: 0,
          pic_url: '',
          sort_order: 100,
          is_show: true,
          floor_price: 0,
          app_list_pic_url: '',
          is_new: false,
          is_hot: false,
          new_pic_url: "",
          new_sort_order: 10,
          category_name: '',
        },
        infoRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
          ],
          goods_brief: [
            { required: true, message: '请输入简介', trigger: 'blur' },
          ],
          list_pic_url: [
            { required: true, message: '请选择商品图片', trigger: 'blur' },
          ],
        },
      }
    },
    methods: {
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      handleSelectChage(val){
        //下拉框选择内容改变后
        this.$set(this.infoForm, 'category_id',val);
      },
      goBackPage() {
        this.$router.go(-1);
      },
      //富文本插入网络图片
      multiDocFileUpload({target}){
        if(!target.files || target.files.length==0){
          return
        }
        const loading = this.$loading('上传中...')
        upyun.uploadGoodsPic(target.files[0]).then(res=>{
          console.log(res)
          let quill = this.$refs.myTextEditor.quill
          let length = quill.getSelection().index
          quill.insertEmbed(length, 'image', res.data.url)
          quill.setSelection(length + 1)
          loading.close()
        })
      },
      onSubmitInfo() {
        this.$refs['infoForm'].validate((valid) => {
          if (valid) {
            this.axios.post('goods/store', this.infoForm).then((response) => {
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
        //加载商品详情
        let that = this
        this.axios.get('goods/info', {
          params: {
            id: that.infoForm.id
          }
        }).then((response) => {
          let resInfo = response.data.data;
          resInfo.is_new = resInfo.is_new ? true : false;
          resInfo.is_show = resInfo.is_show ? true : false;
          resInfo.is_hot = resInfo.is_hot ? true : false;
          resInfo.is_on_sale = resInfo.is_on_sale ? "1" : "0";
          that.infoForm = resInfo;

          // 初始化 summernote
          // that.initSummerNote();
        })
      },
      // 获取所有分类
      getAllCategory(){
        let that = this
        this.axios.get('goods/getAllCategory', {
          params: {}
        }).then((response) => {
          this.$set(that.infoForm,'allCategory',response.data.data)
        })
      },
      // summernote 上传图片，返回链接
      sendFile({target}){
        if(!target.files || target.files.length==0){
          return
        }
        const loading = this.$loading('上传中...')
        upyun.uploadGoodsPic(target.files[0]).then(res=>{
          console.log(res)
          this.$set(this.infoForm,'list_pic_url', res.data.url)
          loading.close()
        })
      },
      // 初始化 summernote
      initSummerNote() {
        let that = this
        $('#summernote').summernote({
          lang:'zh-CN',
          placeholder: '请输入商品描述',
          height: 300,
          minHeight: 300,
          maxHeight: 400,
          focus: true,
          // toolbar:[
          //   ['style',['bold','italic','clear']],
          //   ['fontsize',['fontsize']],
          //   ['para',['ul','ol','paragraph']],
          //   ['insert',['picture','link']]
          // ],
          callbacks: {
            onBlur: function(e){
              console.log(" on blur ");
              console.log($('#summernote').summernote('code'));
              that.infoForm.goods_desc = $('#summernote').summernote('code');
              // that.infoForm.goods_desc = $('#summernote').summernote('code');
            },
            onImageUpload: function(files){
              console.log("onImageUpLoad...");
              console.log(files)
              that.sendFile(files[0]);
            }
          }
        }),
        // console.error(that.infoForm.goods_desc);
        $('#summernote').summernote('code',that.infoForm.goods_desc)
      }

    },
    components: {
      quillEditor
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor.quillEditor
      }
    },
    mounted() {
      const info = this.infoForm;
      info.id = this.$route.query.id || 0
      if(info.id===0){
        info.goods_sn = (new Date().getTime() - new Date('2018-01-01').getTime());
      }
      this.infoForm = info;
      if(this.$route.query.id){
        this.getInfo();
      }
      if(this.infoForm.id == 0){
        this.getAllCategory();
      }
    },
  }

</script>

<style>
  /* .edit_container{ */
  .ql-container{
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
  .image-uploader-diy{
    height: 105px;
  }
  .image-uploader-diy .el-upload {
    border: 1px solid #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .image-uploader-diy .el-upload:hover {
    border-color: #20a0ff;
  }

  .image-uploader-diy .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 187px;
    height: 105px;
    line-height: 105px;
    text-align: center;
  }

  .image-uploader-diy .image-show {
    width: 187px;
    height: 105px;
    display: block;
  }

  .image-uploader-diy .new-image-uploader {
    font-size: 28px;
    color: #8c939d;
    width: 165px;
    height: 105px;
    line-height: 105px;
    text-align: center;
  }

  .image-uploader-diy .new-image-uploader .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 165px;
    height: 105px;
    line-height: 105px;
    text-align: center;
  }

  .image-uploader-diy .new-image-uploader .image-show {
    width: 165px;
    height: 105px;
    display: block;
  }
  .item-url-image-fuzhu .el-input{
    width: 260px;
  }
</style>
