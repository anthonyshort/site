var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    join = path.join;

var app = express();

app.get(/\/(.*)/, function(req, res) {
  res.render(req.params[0], function(err, str){
    if(err) return req.next();
    res.send(str);
  });
});

module.exports = app;
