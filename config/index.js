'use strict';

// setting up the config
var config = {
  env: process.env.ENV || 'production',
  redditLogin: process.env.REDDIT_LOGIN,
  redditPassword: process.env.REDDIT_PWD,
  sub: ['nsfw']
};

module.exports = config;
