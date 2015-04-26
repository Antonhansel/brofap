'use strict';

var config = require('../config/index');

var async = require('async');
var request = require('supertest');
var domain = 'https://oauth.reddit.com';


module.exports = function checkPosts() {
  console.log('Checking posts...');
  async.waterfall([
    function getNewPosts(cb) {
      async.map(config.subs, function(sub, cb) {
        request(domain)
          .get('/r/' + sub + '/hot')
          .send({
            limit: 20,
            count: 10,
            show: 'all'
          })
          .set(config.header)
          .expect(200)
          .end(function(err, res) {
            cb(err, res.body);
          });
      }, cb);
    }, function reconstructObject(data, cb) {
      data.forEach(function(item) {
        item.data = item.data.children;
      });
      cb(null, data);
    }, function crawlImages(data, cb) {
      // data.forEach(function(item) {
      //   console.log(item.data);
      // });
      console.log(data[0].data[0].data);
      cb(null);
    }
  ], function(err) {
    if(err) {
      throw err;
    }
    setTimeout(checkPosts, config.refreshRate * 60 * 1000);
  });
};
