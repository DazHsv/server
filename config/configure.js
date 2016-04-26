var express = require('express'),
	bodyParser = require('body-parser'),
	helmet = require('helmet'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	mongoose = require('mongoose'),
	MongoStore = require('connect-mongo/es5')(session);

// Rutas de la plataforma
var toHome = require('./routes/Home'),
	toVideos = require('./routes/Video'),
	toUsers = require('./routes/User'),
	toCourses = require('./routes/Course'),
	toRedirects = require('./routes/Redirects');

var connection_string = '127.0.0.1:27017/e3';
	if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
	  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
	  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
	  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
	  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
	  process.env.OPENSHIFT_APP_NAME;
	}

	mongoose.connect("mongodb://"+connection_string);

	var db = mongoose.connection;
	db.on('error', function(){
		console.error.bind(console, 'Conection error to db:');
	});
	db.on('open', function() {
		console.log('Conected to mongodb');
	});

module.exports = function(app){
	app.use(bodyParser.urlencoded({extended:true}));
	app.use(bodyParser.json());
	app.use(methodOverride('_method'));
	app.use(express.static('public'));
	app.use(helmet());
	app.set('view engine','pug');

	app.use(session({
		secret:"221weqofyb9iuqxegoi",
		resave:false,
		saveUninitialized:false,
		store: new MongoStore({
			mongooseConnection: db,
			ttl: 24 * 60 * 60
		})
	}));


	// Routing
	app.use('/',toRedirects);
	app.use('/platform',toHome);
	//app.use('/platform/video',toVideos);
	app.use('/platform/profile', toUsers);
	//app.use('/platform/course', toCourses);
}