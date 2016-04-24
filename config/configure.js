var express = require('express'),
	bodyParser = require('body-parser'),
	helmet = require('helmet'),
	methodOverride = require('method-override');

// Routing de la plataforma
var toHome = require('./routes/Home'),
	toVideos = require('./routes/Video'),
	toUsers = require('./routes/User'),
	toCourses = require('./routes/Course'),
	toRedirects = require('./routes/Redirects');

module.exports = function(app){
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(methodOverride('_method'));
	app.use(express.static('public'));
	app.use(helmet());
	app.set('view engine','jade');

	// Routing
	app.use('/',toRedirects);
	app.use('/platform',toHome);
	//app.use('/platform/video',toVideos);
	//app.use('/platform/profile', toUsers);
	//app.use('/platform/course', toCourses);
}