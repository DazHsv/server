var express = require('express'),
	app = express(),
	Configure = require('./config/configure');

//Configure(app);
app.use(express.static('public'));
app.set('view engine','pug');

// Página principal
app.get('/', function(req,res){
	res.render('index');
});

app.get('/login', function(req,res){
	res.redirect('http://elearning-hugosv.rhcloud.com/login');
});

app.get('/register', function(req,res){
	res.redirect('http://elearning-hugosv.rhcloud.com/register');
});


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(server_port,server_ip_address);