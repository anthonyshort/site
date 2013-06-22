var read = require('./read');

module.exports = function(dir) {
  return {
    all: function(fn) {
      read(dir, fn);
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