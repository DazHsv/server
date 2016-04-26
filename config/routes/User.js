var express = require('express'),
	router = express.Router(),
	User = require('../models').User,
	enc = require('../enc');

// Get User Profile
router.get('/:user_id', function(req,res) {
	User.findOne( { _id:req.params.user_id },
	function(err, u) {
		if(err){
			console.error.bind('Error finding user : ');
			res.render('platform/404');
		}else {
			res.render('platform/user/home', {user:u});
		}
	});
});

// Create User
router.post('/register', function(req,res) {

	var exist = {
			user:false,
			email:false
		};

	User.findOne({ nickname:req.body.nickname }, function(err, u){
		exist.user = (u != null) || (u != undefined) ? true : false;
	});
	User.findOne({ email:req.body.email }, function(err, u){
		exist.email = (u != null) || (u != undefined) ? true : false;
	});

	if(!exist.user && !exist.email){

		var today = new Date();
		var data = {
			nickname:req.body.nickname,
			name: {
				first:req.body.firstname,
				last:req.body.lastname
			},
			dates: {
				birth: {
					day:1,
					month:1,
					year:1998
				},
				register: today
			},
			email:req.body.email,
			pwd:enc(req.body.pwd)
		}

		var user = new User(data);
		console.log(user);

		user.save( function(err) {
			if(err) console.error.bind('Error saving user : ');
			res.redirect("/platform");
		});
	}else {
		res.render('platform/user/register',{ error: exist });
	}
});

// Log User
router.get('/login', function(req,res){
	res.redirect('/platform/login');
});
router.post('/login', function(req,res) {
	var pwd = enc(req.body.pwd);
	User.findOne({
		email:req.body.email,
		pwd:pwd
	},
	function(err,user){
		console.log(err);
		console.log('=========');
		console.log(user);
		res.send(':3');
	});
});

// Edit User
router.get('/:user_id/edit', function(req,res) {
	User.findOne( { _id:req.params._id}, function(err,user){
		res.render('platform/user/edit', {user:user});
	});
});
router.patch('/:user_id', function(req,res) {
	var data = {
			nickname:req.body.nickname,
			name: {
				first:req.body.firstname,
				last:req.body.lastname
			},
			dates: {
				birth: {
					day:req.body.day,
					month:req.body.month,
					year:req.body.year
				},
				register: {
					day:registerDate.day,
					month:registerDate.month,
					year:registerDate.year
				}
			},
			email:req.body.email,
			pwd:enc(req.body.pwd)
		}

	var user = new User(data);

	user.update({_id:req.body.id}, function(err) {
		if(err) console.error.bind('Error updating user : ');
		res.redirect('/profile/'+req.body.id);
	});
});

// Delete User
router.get('/:user_id/delete', function(req,res) {
	User.findOne( { _id:req.params.user_id}, function(err,user){
		res.render('platform/user/delete', {user:user});
	});
});
router.delete('/:user_id', function(req,res) {
	User.remove({_id:req.params.user_id}, function(err) {
		if(err){
			console.log('Error deleting user! : ' + err);
			res.redirect('/'+req.params.user_id);
		}else{
			res.redirect('/platform');
		}
	});
});

module.exports = router;