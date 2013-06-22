var express = require('express');
var app = express();
var blog = require('./lib/blog');
var content = require('./lib/content');
var errors = require('./lib/errors');
var articles = require('./lib/blog-api');

app.set('views', './views');
app.set('view engine', 'jade');

app.use('/public', express.static('public'));
app.use('/articles', express.static('articles'));

app.set('articles', articles('./articles'));

app.use(blog);
app.use(content);
app.use(errors);

app.listen(3000);
console.log("Listening on port 3000");