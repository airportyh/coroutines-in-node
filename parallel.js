'use strict'

const co = require('co');
const marked = require('marked');
const fs = require('fs-promise');
const handlebars = require('handlebars');
const path = require('path');

co(function *() {
  let files = yield fs.readdir('markdown');
  let tasks = files.map(function(file) {
    return co(md2html('markdown/' + path.basename(file, '.md')));
  });
  yield Promise.all(tasks);
}).catch(function(err) {
  console.error(err.stack);
});

function * md2html(filename) {
  let md = yield fs.readFile(filename + '.md');
  let html = marked(md.toString());
  let template = yield fs.readFile('layout.hbs');
  let output = handlebars.compile(template.toString())({
    title: filename,
    contents: html
  });
  yield fs.writeFile(filename + '.html', output);
  console.log(`Wrote ${filename}.html`);
}