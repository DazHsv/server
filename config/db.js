var mongoose = require('mongoose');

module.exports.connect = function(fn) {
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
		fn();
	});
}