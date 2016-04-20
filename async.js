'use strict';

const marked = require('marked');
const fs = require('fs');
const handlebars = require('handlebars');

fs.readFile('README.md', function(err, data) {
  if (err) {
    return console.error(err.stack);
  }
  let markdown = data.toString();
  let html = marked(markdown);
  fs.readFile('layout.hbs', function(err, data) {
    if (err) {
      return console.error(err.stack);
    }
    let template = handlebars.compile(data.toString());
    let output = template({
      title: 'README',
      contents: html
    });
    fs.writeFile('index.html', output, function(err) {
      if (err) {
        console.error(err.stack);
      }
    });
  });
});