var express = require('express'),
	app = express(),
	models = require('./config/models'),
	Configure = require('./config/configure'),
	db = require('./config/db');

var User = require('./config/models').User;

db.connect( function() {
	console.log('Connected to MongoDB');
});

Configure(app);

// Página principal
app.get('/', function(req,res){
	res.render('index');
});

app.get('/', function(req,res){
	res.render('platform/home');
});


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || 8080;

app.listen(server_port,server_ip_address);