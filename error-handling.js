'use strict'

const co = require('co');
const marked = require('marked');
const fs = require('fs-promise');
const handlebars = require('handlebars');
const path = require('path');

co(function *() {
  yield md2html('markdown/blah');
}).catch(function(err) {
  console.error(err.stack);
});

function * md2html(filename) {
  try {
    let md = yield fs.readFile(filename + '.md');
    let html = marked(md.toString());
    let template = yield fs.readFile('layout.hbs');
    let output = handlebars.compile(template.toString())({
      title: filename,
      contents: html
    });
    yield fs.writeFile(filename + '.html', output);
    console.log(`Wrote ${filename}.html`);
  } catch (e) {
    console.error(`Failed to convert ${filename}.md because ${e.message}`);
  }
}