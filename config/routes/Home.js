var express = require('express'),
	router = express.Router(),
	User = require('../models').User;

// Home view
router.get('/', function(req,res) {
	if(req.session.user != null){
		res.redirect('/e/profile');
	}else {
		res.render('platform/home');
	}
});

// Register User
router.get('/register', function(req,res) {
	res.render('platform/user/register');
});

// Log User
router.get('/login/', function(req,res) {
	if(req.session.user != null){
		res.redirect('/e/profile');
	}else {
		res.render('platform/user/login',{error:req.query.error});
	}
});

// Logout User
router.get('/logout',function(req,res){
	if(req.session.user && (req.session.user.id)){
		req.session.destroy(function(err){
			console.log('session deleted');
			res.redirect('/e');
		});
	}else {
		res.redirect('/login');
	}
});

// Testing
router.get('/users', function(req,res) {
	User.find( function(err,users) {
		res.setHeader('Content-Type','text/json');
		res.send(users);
	} );
});

module.exports = router;