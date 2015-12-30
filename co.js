'use strict'

const co = require('co');
const marked = require('marked');
const fs = require('fs-promise');
const handlebars = require('handlebars');

co(function *() {
  let md = yield fs.readFile('README.md');
  let html = marked(md.toString());
  let template = yield fs.readFile('layout.hbs');
  let output = handlebars.compile(template.toString())({
    title: 'README',
    contents: html
  });
  yield fs.writeFile('index.html', output);
}).catch(function(err) {
  console.error(err.stack);
});