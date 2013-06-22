var express = require('express');
var path = require('path');
var join = path.join;
var app = express();

app.get('/', function(req, res) {
  app.get('articles').all(function(err, data){
    if(err) return req.next();
    res.render('index', {
      articles: data
    });
  });
});

app.get('/articles/:name', function(req, res, next){
  app.get('articles').get(req.params.name, function(err, data){
    if(err) return next();
    res.render('article', {
      article: data
    });
  });
});

app.get('/:year/:month/:article', function(req, res) {
  res.redirect('/articles/' + req.params.article);
});

module.exports = app;