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

    const model = this.model('coupon');
    // const data = await model.where({name: ['like', `%${name}%`]}).order(['id DESC']).page(page, size).countSelect();
    let coupons = await model.where({name: ['like', `%${name}%`]}).order(['id DESC']).page(page, size).countSelect();    
    const couponList = [];
    for (const coupon of coupons.data) {
        const item = {};
        item.id = coupon.id;
        item.name = coupon.name;
        item.type_money = coupon.type_money;
        item.send_type = coupon.send_type;
        item.min_amount = coupon.min_amount;
        item.max_amount = coupon.max_amount;
        item.send_start_date =  think.datetime(new Date(coupon.send_start_date * 1000));
        item.send_end_date = think.datetime(new Date(coupon.send_end_date * 1000));
        item.use_start_date = think.datetime(new Date(coupon.use_start_date * 1000));
        item.use_end_date = think.datetime(new Date(coupon.use_end_date * 1000));
        item.min_goods_amount = coupon.min_goods_amount;
       
        couponList.push(item);
      }
      coupons.data = couponList;

    return this.success(coupons);
  }

  async infoAction() {
    const id = this.get('id');
    const model = this.model('coupon');
    const data = await model.where({id: id}).find();

    //时间格式转换
    data.send_start_date = think.datetime(new Date(data.send_start_date * 1000));
    data.send_end_date = think.datetime(new Date(data.send_end_date * 1000));
    data.use_start_date = think.datetime(new Date(data.use_start_date * 1000));
    data.use_end_date = think.datetime(new Date(data.use_end_date * 1000));

    return this.success(data);
  }

  async storeAction() {
    if (!this.isPost) {
      return false;
    }

    const values = this.post();
    const id = this.post('id');

    const model = this.model('coupon');
    values.send_start_date = new Date(Buffer.from(values.send_start_date).toString()).valueOf()/1000;
    values.send_end_date = new Date(Buffer.from(values.send_end_date).toString()).valueOf()/1000;
    values.use_start_date = new Date(Buffer.from(values.use_start_date).toString()).valueOf()/1000;
    values.use_end_date = new Date(Buffer.from(values.use_end_date).toString()).valueOf()/1000;
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
    await this.model('coupon').where({id: id}).limit(1).delete();
    return this.success();
  }
};
