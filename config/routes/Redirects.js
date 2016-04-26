var express = require('express'),
	router = express.Router();

router.get('/login', function(req,res){
	res.redirect('/platform/login');
});

router.get('/register', function(req,res){
	res.redirect('/platform/register');
});

router.get('/video/:video_id', function(req,res){
	res.redirect('/platform/video/'+req.params.video_id);
});

router.get('/user/:user_id', function(req,res){
	res.redirect('/platform/user/'+req.params.video_id);
});

module.exports = router;