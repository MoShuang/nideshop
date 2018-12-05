var upyun = require('node-upyun-sdk');
var instance = upyun('bucketname', 'username', 'password');

instance.getUsage('/').then(function(data) {
  console.log(data);
}).catch(function(error) {
  console.log(error);
});

instance.upload('/aaa/', 'img/c.jpg'); // 将c.jpg文件上传到/aaa/下，保存的文件名为c.jpg
instance.upload('/aaa/a.jpg', 'img/c.jpg'); // 下c.jpg文件上传到/aaa/下，重新设置文件名为a.jpg
instance.upload('/aaa', 'img/'); // 将img/下的所有文件上传到/aaa目录下
instance.upload('/aaa/a.jpg', 'img/c.jpg', 'welefen'); // 设置文件的Content-Secret上传
instance.upload('/aaa/a.jpg', 'img/c.jpg', {
  'x-gmkerl-type': 'fix_width',
  'x-gmkerl-value': 150
}); // 设置图片处理信息
