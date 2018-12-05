const mysql = require('think-model-mysql');

module.exports = {
  handle: mysql,
  database: 'mall',
  prefix: 'nideshop_',
  encoding: 'utf8mb4',
  host: '',
  port: '',
  user: 'root',
  password: '',
  dateStrings: true
};
