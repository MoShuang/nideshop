const Host = 'http://localhost:8360';
const rootUrl = `${Host}/admin/`;
const config = {
  Host,
  rootUrl,
  upyunConfig: {
    rootDir: '/mall',                   // 又拍云上保存资源的根目录，随意指定
    service: '',                        // 服务名，和上面bucket一直
    cdnUrl: '',  // cdn地址，这个要解析自己的域名指向又拍云的cdn，小程序上静态资源可能需要https，这个还没验证
    signUrl: `${rootUrl}/auth/getSign`  // 获取又拍云签名
  }
}

module.exports = config