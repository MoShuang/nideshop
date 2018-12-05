const Base = require('./base.js');
const fs = require('fs');
const STATIC_BASE_URL = think.ROOT_PATH + '/www';

module.exports = class extends Base {
  async goodsDetailPicAction() {
    const adFile = this.file('goods_detail_pic');
    if (think.isEmpty(adFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/goodsdetail/' + think.uuid(32) + '.jpg';
    const is = fs.createReadStream(adFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'goods_detail_pic',
      fileUrl: STATIC_BASE_URL + filename
    });
  }

  async channelUrlPicAction() {
    const adFile = this.file('url_pic');
    if (think.isEmpty(adFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/channel/' + think.uuid(32) + '.jpg';
    const is = fs.createReadStream(adFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'channel_url_pic',
      fileUrl: STATIC_BASE_URL + filename
    });
  }

  async channelIconPicAction() {
    const adFile = this.file('icon_pic');
    if (think.isEmpty(adFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/channel/' + think.uuid(32) + '.jpg';
    const is = fs.createReadStream(adFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'channel_icon_pic',
      fileUrl: STATIC_BASE_URL + filename
    });
  }

  async adPicAction() {
    const adFile = this.file('ad_pic');
    if (think.isEmpty(adFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/ad/' + think.uuid(32) + '.jpg';
    const is = fs.createReadStream(adFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'ad_pic',
      fileUrl: STATIC_BASE_URL + filename
    });
  }

  async brandPicAction() {
    const brandFile = this.file('brand_pic');
    if (think.isEmpty(brandFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/brand/' + think.uuid(32) + '.jpg';
    const is = fs.createReadStream(brandFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'brand_pic',
      fileUrl: STATIC_BASE_URL + filename
    });
  }

  async brandNewPicAction() {
    const brandFile = this.file('brand_new_pic');
    if (think.isEmpty(brandFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/brand/' + think.uuid(32) + '.jpg';

    const is = fs.createReadStream(brandFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'brand_new_pic',
      fileUrl: STATIC_BASE_URL + filename
    });
  }

  async categoryWapBannerPicAction() {
    const imageFile = this.file('wap_banner_pic');
    if (think.isEmpty(imageFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/category/' + think.uuid(32) + '.jpg';

    const is = fs.createReadStream(imageFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'wap_banner_url',
      fileUrl: STATIC_BASE_URL + filename
    });
  }

  async topicThumbAction() {
    const imageFile = this.file('scene_pic_url');
    if (think.isEmpty(imageFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/topic/' + think.uuid(32) + '.jpg';

    const is = fs.createReadStream(imageFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'scene_pic_url',
      fileUrl: STATIC_BASE_URL + filename
    });
  }

  async topicContentAction() {
    const imageFile = this.file('topic_content_pic');
    if (think.isEmpty(imageFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/topic/' + think.uuid(32) + '.jpg';

    const is = fs.createReadStream(imageFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'topic_content_pic_url',
      fileUrl: STATIC_BASE_URL + filename
    });
  }

  async goodsGalleryPicAction() {
    const imageFile = this.file('goodsgallery_pic');
    if (think.isEmpty(imageFile)) {
      return this.fail('保存失败');
    }
    const that = this;
    const filename = '/static/upload/goodsgallery/' + think.uuid(32) + '.jpg';

    const is = fs.createReadStream(imageFile.path);
    const os = fs.createWriteStream(think.ROOT_PATH + '/www' + filename);
    is.pipe(os);

    return that.success({
      name: 'goods_gallery_pic',
      fileUrl: STATIC_BASE_URL + filename
    });
  }
};
