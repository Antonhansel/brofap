'use strict';

var config = require('../config/index');

var async = require('async');
var request = require('supertest');
var domain = 'https://oauth.reddit.com';
var crawler = require('./crawler');

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
        if(item.data.children) {
          item.data = item.data.children;
        }
      });
      data = data[0].data;
      data.filter(function(item) {
        return item.post_hint === 'image';
      });
      cb(null, [data[0]]);
    }, function crawlImages(data, cb) {
      async.map(data, function(item, cb) {
        console.log(item);
        crawler(item.data, cb);
      }, cb);
    }
  ], function(err) {
    if(err) {
      throw err;
    }
    setTimeout(checkPosts, config.refreshRate * 60 * 1000);
  });
};
