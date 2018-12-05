var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');

var app = getApp();

Page({
  data: {
    array: ['请选择反馈类型', '商品相关', '物流状况', '客户服务', '优惠活动', '功能异常', '产品建议', '其他'],
    msgtype: 0,
    phonenum: '',
    content: '',
    remainstr: '0/500'
  },
  bindPickerChange: function (e) {
    this.setData({
      msgtype: e.detail.value
    })
  },
  bindTextareaInput: function (e) {
    var remainstr = e.detail.value.length + "/500"
    this.setData({
      remainstr: remainstr,
      content: e.detail.value
    })
  },
  bindMobileInput: function (e) {
    this.setData({
      phonenum: e.detail.value
    })
  },
  bindSubmit: function (e) {
    var error = ""
    if (this.data.msgtype == 0){
      error = "请选择反馈类型！"
    }else if (this.data.content == ""){
      error = "请输入反馈内容！"
    } else if (this.data.phonenum == "") {
      error = "请输入手机号,方便我们与你联系！"
    }
    if (error != ""){
      wx.showModal({
        title: '提示',
        content: error,
        showCancel:false
      })
      return
    }
    
    var that = this;
    util.request(api.FeedbackSubmit, {
      msgtype: that.data.msgtype,
      content: that.data.content,
      phonenum: that.data.phonenum
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        wx.showToast({
          title: '反馈成功',
          complete: function () {
            wx.navigateBack({
              delta: 1
            });
          }
        })
      }
      console.log(res)
    });
  },
  onLoad: function (options) {
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})