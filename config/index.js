'use strict';

// setting up the config
var config = {
  env: process.env.ENV || 'production',
  refreshRate: process.env.REFRESH_RATE || 1,
  redditLogin: process.env.REDDIT_LOGIN,
  redditPassword: process.env.REDDIT_PWD,
  redditSecret: process.env.REDDIT_SECRET,
  redditId: process.env.REDDIT_ID,
  header: {
    Authorization: '',
    'User-Agent': 'BrofapClient/0.1 By AntonHansel'
  },
  subs: ['nsfw']
};

// exposing
module.exports = config;
