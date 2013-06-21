var fs = require('fs'),
    markdown = require('markdown').markdown,
    path = require('path'),
    Batch = require('batch'),
    join = path.join;

module.exports = function(dir, fn) {
  var batch = new Batch();

  batch.push(function(done){
    fs.readFile(join(dir, 'meta.json'), done);
  });

  batch.push(function(done){
    fs.readFile(join(dir, 'index.md'), done);
  });

  batch.end(function(err, results){
    if(err) return fn(err);
    var post = JSON.parse(results[0]);
    post.slug = path.basename(dir);
    post.content = markdown.toHTML(results[1].toString());
    fn(null, post);
  });

};