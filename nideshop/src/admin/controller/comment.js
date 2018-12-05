const Base = require('./base.js');

module.exports = class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    const page = this.get('page') || 1;
    const size = this.get('size') || 10;
    const name = this.get('name') || '';
    const status= this.get('status') || 0;
    const userid= this.get('user_id') || '';
    const valueid=this.get('value_id') || '';

    const model = this.model('comment');
    // const data = await model.where({content: ['like', `%${name}%`]}).order(['id DESC']).page(page, size).countSelect();

    let comments = await model.where({content: ['like', `%${name}%`]}).order(['id DESC']).page(page, size).countSelect();
    const commentList = [];
    for (const commentItem of comments.data) {
        const comment = {};
        comment.content = Buffer.from(commentItem.content, 'base64').toString();
        comment.type_id = commentItem.type_id;
        comment.value_id = commentItem.value_id;
        comment.id = commentItem.id;
        comment.add_time = think.datetime(new Date(commentItem.add_time * 1000));
        comment.user_id = commentItem.user_id;
        comment.status = commentItem.status;
        // comment.user_info = yield _this3.model('user').field(['username', 'avatar', 'nickname']).where({ id: commentItem.user_id }).find();
        // comment.pic_list = yield _this3.model('comment_picture').where({ comment_id: commentItem.id }).select();
        commentList.push(comment);
      }
      comments.data = commentList;

    // return this.success(data);
    return this.success(comments);
  }

  async infoAction() {
    const id = this.get('id');
    const model = this.model('comment');
    // const data = await model.where({id: id}).find();
    // 评论转码，时间转格式
    let comments = await model.where({id: id}).find();
    comments.content = Buffer.from(comments.content, 'base64').toString();
    comments.add_time = think.datetime(new Date(comments.add_time * 1000));
    return this.success(comments);
  }

  async storeAction() {
    if (!this.isPost) {
      return false;
    }

    const values = this.post();
    const id = this.post('id');

    const model = this.model('comment');
    values.content = Buffer.from(values.content).toString('base64');
    if (id > 0) {
      await model.where({id: id}).update(values);
    } else {
      delete values.id;
      await model.add(values);
    }
    return this.success(values);
  }

  async destoryAction() {
    const id = this.post('id');
    await this.model('comment').where({id: id}).limit(1).delete();
    return this.success();
  }
};
