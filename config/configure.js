var express = require('express'),
	bodyParser = require('body-parser'),
	helmet = require('helmet'),
	methodOverride = require('method-override');

// Routing de la plataforma
var homeRoutes = require('./routes/Home'),
	videoRoutes = require('./routes/Video'),
	userRoutes = require('./routes/User'),
	courseRoutes = require('./routes/Course');

module.exports = function(app){
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(methodOverride('_method'));
	app.use(express.static('public'));
	app.use(helmet());
	app.set('view engine','jade');

	// Routing
	//app.use('/platform',homeRoutes);
	//app.use('/platform/video',videoRoutes);
	//app.use('/platform/profile', userRoutes);
	//app.use('/platform/course', courseRoutes);
}