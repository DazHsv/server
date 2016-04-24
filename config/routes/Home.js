var express = require('express'),
	router = express.Router(),
	User = require('../models').User;

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
	User.find( (err,users) => {
		res.send(users);
	} );
});

module.exports = router;