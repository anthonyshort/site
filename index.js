var express = require('express');
var app = express();
var blog = require('./lib/blog');
var content = require('./lib/content');
var errors = require('./lib/errors');

app.set('views', './views');
app.set('view engine', 'jade');

app.use('/public', express.static('public'));
app.use('/articles', express.static('articles'));

app.use(blog({
  articles: './articles'
}));
app.use(content);
app.use(errors);

app.listen(3000);
console.log("Listening on port 3000");