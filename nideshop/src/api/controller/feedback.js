const Base = require('./base.js');

module.exports = class extends Base {
/**'
   * 意见反馈
   * msg_type说明：
   * 1 商品相关
   * 2 物流状况
   * 3、客户服务
   * 4、优惠活动
   * 5、功能异常
   * 6、产品建议
   * 7、其他
   */

  /**
   * 发表反馈
   * @returns {Promise.<*|PreventPromise|void|Promise>}
   */
  async submitAction() {
    const msgtype = this.post('msgtype');
    const content = this.post('content');
    const phonenum = this.post('phonenum');
    var msgtitle = ['商品相关',"物流状况","客户服务","优惠活动","功能异常","产品建议","其他"];
    const insertId = await this.model('feedback').add({
      msg_type: msgtype,
      msg_content: content,
      user_phone: phonenum,
      msg_title: msgtitle[msgtype-1],
      msg_time: this.getTime(),
      user_id: this.getLoginUserId(),
      user_name: this.getLoginUserInfo().nickname
    });

    if (insertId) {
      return this.success('意见反馈添加成功');
    } else {
      return this.fail('意见反馈保存失败');
    }
  }
}