const fs = require('fs');

module.exports = {
  development: {
    username: 'root',
    password: '',
    database: 'android_app_dev',
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true
    }
  },
  production: {
    username: 'vkyalhbid00tnmvy',
    password: 'y1a4txvdxvjvn7s6',
    database: 'pwjv8lz5jjfpg6j3',
    host: 'eporqep6b4b8ql12.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    port: 3306,
    dialect: 'mariadb',
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
};