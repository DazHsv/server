var express = require('express'),
	router = express.Router(),
	User = require('../models').User,
	enc = require('../enc'),
	session = require('express-session'),
	MongoStore = require('connect-mongo/es5')(session);

// User Home
router.get('/',function(req,res){
	if(req.session.user != null){
		User.findOne({
			'_id':req.session.user.id,
			'email':req.session.user.email
		},function(err,u){
			res.render('platform/user/index',{user:u});
		});
	}else {
		res.redirect('/login');
	}
});

// Verify User Email
router.get('/verify', function(req,res){
	res.render('platform/user/verify');
});

// Get User Profile
router.get('/:user_id', function(req,res) {
	User.findOne( { _id:req.params.user_id }, function(err, u) {
		if(err){
			console.error.bind('Error finding user : ');
			res.render('platform/404');
		}else {
			res.render('platform/user/index', {user:u});
		}
	});
});

// Create User
router.post('/register', function(req,res) {
	var today = new Date();
	var pwd = enc(req.body.pwd);
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
		pwd:pwd
	}

	var user = new User(data);
	console.log(user);

	user.save( function(err) {
		if(err) {
			console.log(err);
			res.end();
		}else{
			req.session.user = {
				'id':user._id,
				'email':user.email
			};
			res.redirect("/e/profile/");
		}
	});
});

// User courses
router.get('/courses',function(req,res){
	if( (req.session.user != null) && req.session.user.id){
		User.findOne({
			'_id':req.session.user.id
		}, 'courses' ,function(err,courses){
			res.render('platform/course/index',{'courses': courses});
		});
	}else{
		res.redirect('/login');
	}
});

// User videos
router.get('/videos',function(req,res){
	if( (req.session.user != null) && req.session.user.id){
		User.findOne({
			'_id':req.session.user.id
		}, 'videos' ,function(err,videos){
			res.render('platform/video/index',{'videos': videos});
		});
	}else{
		res.redirect('/login');
	}
});

// Login User
router.post('/login/', function(req,res) {
	var pwd = enc(req.body.pwd);
	User.findOne({
		'email':req.body.email,
		'pwd':pwd
	},
	function(err,user){
		console.log(req.body.email);
		console.log(pwd);
		console.log(user);
		if(err || (user == null)){
			res.redirect('/e/login/?error=true');
		}else{
			req.session.user = {
				'id':user._id,
				'email':user.email
			};
			res.redirect("/e/profile/");
		}
	});
});

// Edit User
router.get('/:user_id/edit', function(req,res) {
	if(req.session.user._id && (req.session.user._id == req.params.user_id) ){
		res.redirect('/e/profile/'+req.params.user_id);
	}else {
		User.findOne( { _id:req.params._id}, function(err,user){
			res.render('platform/user/edit', {user:user});
		});
	}
});
router.patch('/:user_id', function(req,res) {
	var pwd = enc(req.body.pwd);
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
			pwd:pwd
		}

	var user = new User(data);

	user.update({_id:req.params.user_id}, function(err) {
		if(err != null){
			res.redirect('/e/profile/'+req.params.user_id);
		}else{
			console.error.bind('Error updating user : ' + err);
			res.redirect('/e/profile/'+req.params.user_id);
		}
	});
});

// Delete User
router.get('/:user_id/delete', function(req,res) {
	if(req.session.user._id && (req.session.user._id == req.params.user_id)){
		User.findOne( { _id:req.params.user_id}, function(err,user){
			res.render('platform/user/delete', {user:user});
		});
	}else {
		res.redirect('/e/profile/'+req.params.user_id);
	}

});
router.delete('/:user_id', function(req,res) {
	User.remove({_id:req.params.user_id}, function(err) {
		if(err != null){
			res.redirect('/platform');
		}else{
			console.log('Error deleting user! : ' + err);
			res.redirect('/'+req.params.user_id);
		}
	});
});

module.exports = router;