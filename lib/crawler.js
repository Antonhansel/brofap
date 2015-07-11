'use strict';

var request = require('supertest');
var async = require('async');

module.exports = function(data, cb) {
  async.waterfall([
    function crawlData(cb) {
      request('https://www.google.com/searchbyimage?&image_url=')
      .get(data.url)
      .expect(302)
      .end(cb);
    }, function followRedirect(result, cb) {
      request(result.header.location)
      .get()
      .set('followlocation', 1)
      .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11')
      .expect(200)
      .end(cb);
    }, function compactData(result, cb) {
      data.result = result;
      console.log(result);
      cb(null, data);
    }
    ], cb);
};
