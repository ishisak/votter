
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var votter = require('./routes/votter');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//とりあえず、indexを移し替えてみた
//by daigoro

// app.get('/', routes.index);
app.get('/', votter.top);
app.get('/newform', votter.newform);
app.post('/create', votter.create);
app.get('/vote/:id', votter.vote);
app.post('/voted/:id', votter.voted);
app.get('/hadVoted', votter.hadVoted);
app.get('/result/:id', votter.result);
app.post('/mng/:id', votter.mng);
app.get('/mng/deleteall/:id/:id_token', votter.deleteall);
app.get('/mng/openEvent/:id/:id_token', votter.openEvent);
app.get('/mng/closeEvent/:id/:id_token', votter.closeEvent);
app.get('/mng/updPrivateStatus/:id/:status', votter.updPrivateStatus);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
