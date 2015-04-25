'use strict';
// Loading other modules
var getToken = require('./lib/authenticate');
var checkPosts = require('./lib/checkPosts');

function initialize() {
  getToken(function() {
    checkPosts();
  });
};

initialize();
