'use strict'

const bluebird = require('bluebird');
const marked = require('marked');
const fs = require('fs-promise');
const handlebars = require('handlebars');

const md2html = bluebird.coroutine(function * md2html(filename) {
  let md = yield fs.readFile(filename + '.md');
  let html = marked(md.toString());
  let template = yield fs.readFile('layout.hbs');
  let output = handlebars.compile(template.toString())({
    title: filename,
    contents: html
  });
  return output;
});

bluebird.coroutine(function *() {
  let html = yield md2html('README');
  console.log(html);
})().catch(function(err) {
  console.error(err.stack);
});