var express = require('express'),
	router = express.Router();

router.get('/login', function(req,res){
	res.redirect('http://elearning-hugosv.rhcloud.com/login');
});

router.get('/register', function(req,res){
	res.redirect('http://elearning-hugosv.rhcloud.com/register');
});

/*router.get('/video/:video_id', function(req,res){
	res.redirect('/e/video/'+req.params.video_id);
});

router.get('/user/:user_id', function(req,res){
	res.redirect('/e/user/'+req.params.video_id);
});*/

module.exports = router;