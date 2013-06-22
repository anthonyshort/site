var post = require('./post'),
    fs = require('fs'),
    path = require('path'),
    cache = {},
    Batch = require('batch');

module.exports = function(dir, fn) {
  if(cache[dir]) {
    return fn(null, cache[dir]);
  }
  var articles = [];
  var batch = new Batch();
  fs.readdir(dir, function(err, dirs){
    if(err) return fn(err);
    dirs.forEach(function(slug) {
      batch.push(function(done){
        post(path.join(dir, slug), done);
      });
    });
    batch.end(function(err, articles){
      if(err) return fn(err);
      cache[dir] = articles;
      fn(null, articles);
    });
  });
};