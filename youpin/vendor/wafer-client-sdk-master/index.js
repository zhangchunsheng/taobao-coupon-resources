var constants = require('./lib/constants');
var login = require('./lib/login');
var Session = require('./lib/session');
var request = require('./lib/request');
var Tunnel = require('./lib/tunnel');
var exports = module.exports = {
  login: function () {
    return new Promise((resolve, reject) => {
      login.login({
        success(result) {
          resolve(result);
        },
        fail(error) {
          reject(error);
        }
      })
    });
  },
  setLoginUrl: login.setLoginUrl,
  LoginError: login.LoginError,

  clearSession: Session.clear,
  get: function (option,callback) {
    request.request({
      url: option.url,
      login: true,
      method: 'get',
      success(result) {
        callback(null, result);
      },
      fail(error) {
        if (error.type =='ERR_WX_GET_USER_INFO'){
          wx.getSetting({
            success: (res) => {
              if (!res.authSetting['scope.userInfo']) {
                wx.navigateTo({
                  url: '/pages/authorize/authorize'
                });
              } else {
                callback(error, null);
              }
            }
          })
        }
        
      }
    })

  },
  post: function (option, callback) {
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '/pages/authorize/authorize'
          });
        } else {
          request.request({
            url: option.url,
            login: true,
            method: 'post',
            data: option.data || {},
            success(result) {
              callback(null, result);
            },
            fail(error) {
              callback(error, null);
            }
          })
        }
      }
    })
  },
  buildSessionHeader: request.buildSessionHeader,
  RequestError: request.RequestError,

  Tunnel: Tunnel,
};

// 导出错误类型码
Object.keys(constants).forEach(function (key) {
  if (key.indexOf('ERR_') === 0) {
    exports[key] = constants[key];
  }
});