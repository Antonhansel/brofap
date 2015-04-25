'use strict';

var config = require('../config/index');

var async = require('async');
var request = require('supertest');
var domain = 'https://www.reddit.com';

var authorization = "Basic " + new Buffer(config.redditId + ':' + config.redditSecret).toString('base64');


module.exports = function getTokens(callback) {
  // This is the request we are making:
  // curl -X POST -d 'grant_type=password&username=redditUsername&password=redditPassword' --user 'appId:appSecret' https://www.reddit.com/api/v1/access_token
  async.waterfall([
    function getToken(cb) {
      request(domain)
        .post('/api/v1/access_token')
        .send({
          grant_type: 'password',
          username: config.redditLogin,
          password: config.redditPassword
        })
        .set({
          Authorization: authorization,
          'Content-Type': 'application/x-www-form-urlencoded',
        })
        .end(cb);
    }, function saveToken(data, cb) {
      config.header.Authorization = 'Bearer ' + data.body.access_token;
      config.access_token = data.body.access_token;
      config.expires_in = data.body.expires_in;
      cb(null);
    }
  ], function(err) {
    if(err) {
      throw err;
    }
    console.log('Retrieved tokens succesfully!');
    setTimeout(getTokens, config.expires_in / 2 * 1000);
    if(callback) {
      callback();
    }
  });
};
