var express = require('express');
var app = express();
// app.set('views', __dirname);
// app.set('view engine', 'jade');

app.get('404', function(req, res){
  res.render('404', { url: req.url });
});

// 404
app.get('*', function(req, res, next) {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.redirect('/404');
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

// 500
app.use(function(err, req, res, next) {
  if (req.accepts('json')) {
    res.send(500, { error: 'Something blew up!' });
  }
  else {
    res.status(500);
    res.render('error', { error: err });
  }
});

module.exports = app;