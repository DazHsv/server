var express = require('express'),
	router = express.Router(),
	User = require('../models').User;

// Home view
router.get('/', function(req,res) {
	res.render('platform/home');
});

// Register User
router.get('/register', function(req,res) {
	res.render('platform/user/register');
});

// Log User
router.get('/login', function(req,res) {
	res.render('platform/user/login');
});

// Testing
router.get('/users', function(req,res) {
	User.find( function(err,users) {
		res.setHeader('Content-Type','text/json');
		res.send(users);
	} );
});

module.exports = router;