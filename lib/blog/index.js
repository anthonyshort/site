var express = require('express');
var path = require('path');
var join = path.join;
var api = require('../blog-api');

module.exports = function(options){
  var posts = api(options.articles);
  var app = express();

  app.get('/', function(req, res) {
    posts.all(function(err, data){
      res.render('index', {
        articles: data
      });
    });
  });

  app.get('/articles/:name', function(req, res, next){
    posts.get(req.params.name, function(err, data){
      if(err) return next();
      res.render('blog/article', {
        article: data
      });
    });
  });

  app.get('/:year/:month/:article', function(req, res) {
    res.redirect('/articles/' + req.params.article);
  });

  return app;
};