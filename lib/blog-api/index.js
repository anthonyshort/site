var fs = require('fs'),
    path = require('path'),
    Batch = require('batch'),
    getPost = require('./post');

module.exports = function(dir){
  return {
    all: function(fn) {
      var articles = [];
      var batch = new Batch();
      fs.readdir(dir, function(err, dirs){
        if(err) return fn(err);
        dirs.forEach(function(slug) {
          batch.push(function(done){
            getPost(path.join(dir, slug), done);
          });
        });
        batch.end(function(err, articles){
          if(err) return fn(err);
          fn(null, articles);
        });
      });
    },
    get: function(slug, fn) {
      this.all(function(err, articles){
        if(err) {
          return fn(err);
        }
        var post;
        articles.some(function(p){
          if(p.slug === slug) {
            post = p;
            return true;
          }
        });
        if(!post) {
          return fn('Post doesnt exist');
        }
        fn(null, post);
      });
    }
  };
};