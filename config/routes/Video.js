var express = require('express'),
	router = express.Router(),
	Video = require('../models').Video,
	Comment = require('../models').Comment;


// Watch Video => /platform/video/:video_id
router.get('/:video_id', function(req,res) {
	Video.findOne({_id:req.params.video_id}, function(err, v){
		if(err){
			console.error.bind('Error finding video : ');
			res.render('platform/404');
		}else {
			res.render('platform/video/watch',{video:v});
		}
	});
});

// Create Video => /platform/video/new
router.get('/new', function(req,res) {
	res.render('platform/video/new');
});
router.post('/new', function(req,res) {
	// "photoshop,diseño,montaje" => ["photoshop","diseño","montaje"
	var tags = req.body.tags.split(','),

	// TODO: Obtener el id del usuario desde la sesión en curso
		owner = req.body.owner;

	var data = {
		owner:owner,
		title:req.body.title,
		description:(req.body.description || 'No hay descripcion disponible'),
		category:(req.body.category || ''),
		tags:(tags || []),
		course: req.body.course,
		public: req.body.public,
		url:req.body.url
	}

	var video = new Video(data);

	video.save( function(err) {
		if(err) console.error.bind('Error saving video : ');
		var url = '/'+data.url;
		res.redirect(url);
	});
});

// Edit Video => /platform/video/:video_id/edit
router.get('/:video_id/edit', function(req,res) {
	Video.findOne({_id:req.params.id}, function(err, v){
		if(err) console.error.bind('Error finding video : ');
		res.render('platform/video/edit',{ video:v});
	});
});
router.patch('/:video_id/edit', function(req,res) {
	// "photoshop,diseño,montaje"
	var tags = req.body.tags.split(',');
	// ["photoshop","diseño","montaje"]

	var data = {
		owner:req.body.owner,
		title:req.body.title,
		description:(req.body.description || ''),
		category:(req.body.category || ''),
		tags:(tags || []),
		course: req.body.course,
		public: req.body.public,
		url:req.body.url
	}

	var video = new Video(data);

	video.update({ _id:req.params.video_id },data, function(err) {
		if(err) console.log(err);
		var url = '/'+data.url;
		res.redirect(url);
	});
});

// Delete Video => /platform/:video_id/delete
router.get('/:video_id/delete', function(req,res) {
	Video.findOne({ _id:req.params.video_id}, function(err,video) {
		if(err) console.error.bind('Error finding video to delete it : ');

		var data = { id:video.id, title:video.title }
		
		res.render('platform/video/delete', {v:data});
	});
});
router.delete('/:video_id', function(req,res) {
	/*
		TODO: Redirigir a los video del usuario
	*/
	Video.remove({_id:req.params.video_id}, function(err) {
		if(err) console.error.bind('Error deleting video : ');
		res.redirect('/platform');
	});
});

// Comment Video => /platform/video/:video_id/c
router.post('/:video_id/c', function(req,res) {
	var owner = req.body.owner;
	var data = {
		owner:owner,
		title:req.body.title,
		body:req.body.body,
	}

	var comment = new Comment(data);

	comment.save( function(err) {
		if(err) console.error.bind('Error saving comment : ');

		var data = {};
		data.comments.push(comment.id);

		Video.update({_id:req.params.video_id},data, function(error) {
			if(error) console.error.bind('Error updating video : ');
			res.send(true);
		});
	} );
});

module.exports = router;