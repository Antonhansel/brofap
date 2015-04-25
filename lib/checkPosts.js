'use strict';

var config = require('../config/index');

var async = require('async');
var request = require('supertest');
var domain = 'https://oauth.reddit.com';


module.exports = function checkPosts() {
  console.log('Checking posts...');
  async.waterfall([
    function checkPosts(cb) {
      // var getBasicInfos = function() {
      //   request(OAuthDomain)
      //     .get('/api/v1/me')
      //     .set(config.header)
      //     .expect(200)
      //     .end(function(err, res) {
      //       console.log(res.body);
      //     });
      // };
      cb(null);
    }
    ], function(err) {
    if(err) {
      throw err;
    }
    setTimeout(checkPosts, config.refreshRate * 60 * 1000);
  });
};
