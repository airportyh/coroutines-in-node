'use strict'
const request = require('request-promise');
const co = require('co');

co(function *() {
  let result = request({
    url: 'https://api.github.com/repos/petkaantonov/bluebird', 
    json: true,
    headers: { 'User-Agent': 'express' }
  });
  let owner = result.owner.login;
  console.log(owner);
}).catch(function(err) {
  console.error(err.stack);
});