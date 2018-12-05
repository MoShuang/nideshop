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

    const model = this.model('goods');
    // const data = await model.where({name: ['like', `%${name}%`]}).order(['id DESC']).page(page, size).countSelect();

    const goods = await model.where({name: ['like', `%${name}%`]}).order(['id DESC']).page(page, size).countSelect();
    // 遍历获取分类名称
    const goodsList = [];
    for (const goodItem of goods.data) {
      const good = goodItem;
      const category = await this.model('category').field(['name']).where({id: goodItem.category_id}).find();
      good.category_name = category.name
      goodsList.push(good);
    }
    goods.data = goodsList;

    return this.success(goods);
  }

  //获取所有分类信息
  async getAllCategoryAction(){
    const model = this.model('category');
    const allCategorys = await model.field(['id','name']).where({parent_id: ['!=',0]}).select();
    const data = [];
    for (const categoryItem of allCategorys) {
      const item = {};
      item.id = categoryItem.id;
      item.name = categoryItem.name;
      data.push(item);
    }
    return this.success(data)
  }

  async infoAction() {
    const id = this.get('id');
    const model = this.model('goods');
    const data = await model.where({id: id}).find();
    
    const rowcategory = await this.model('category').field(['name']).where({id: data.category_id}).find();
    data.category_name =  rowcategory.name;
    data.allCategory = [];
    const allCategorys = await this.model('category').field(['id','name']).where({parent_id: ['!=',0]}).select();
    for (const categoryItem of allCategorys) {
      const item = {};
      item.id = categoryItem.id;
      item.name = categoryItem.name;
      data.allCategory.push(item);
    }

    return this.success(data);
  }

  async storeAction() {
    if (!this.isPost) {
      return false;
    }

    const values = this.post();
    const id = this.post('id');

    const model = this.model('goods');
    values.is_on_sale = values.is_on_sale ? 1 : 0;
    values.is_new = values.is_new ? 1 : 0;
    values.is_hot = values.is_hot ? 1 : 0;
    
    if (id > 0) {
      
      await model.where({id: id}).update(values);

      // 对应的修改product表
      const model_product = this.model('product');
      const product_row = [];
      product_row.goods_number = values.goods_number;
      product_row.retail_price = values.retail_price;
      await model_product.where({goods_id:values.goods_sn}).update(product_row)

    } else {
      delete values.id;

      // 对应的添加到product表中
      const model_product = this.model('product');
      const product_row = [];
      product_row.goods_id = values.goods_sn;
      product_row.goods_sn = values.goods_sn;
      product_row.goods_number = values.goods_number;
      product_row.retail_price = values.retail_price;
      await model_product.add(product_row)
      
      values.id = values.goods_sn;
      await model.add(values);
    }
    return this.success(values);
  }

  async destoryAction() {
    const id = this.post('id');
    await this.model('goods').where({id: id}).limit(1).delete();
    // TODO 删除图片

    return this.success();
  }
};
