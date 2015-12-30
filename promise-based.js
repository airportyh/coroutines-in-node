'use strict'

const marked = require('marked');
const fs = require('fs-promise');
const handlebars = require('handlebars');

fs.readFile('README.md').then(function(md) {;
  let html = marked(md.toString());
  return [fs.readFile('layout.hbs'), html];
})
.spread(function(template, html) {
  let output = handlebars.compile(template.toString())({
    title: 'README',
    contents: html
  });
  return fs.writeFile('index.html', output);
})
.catch(function(err) {
  console.error(err.stack);
});