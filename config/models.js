 var mongoose = require('mongoose'),
	Schema   = mongoose.Schema
	user     = require('./models/User'),
	video    = require('./models/Video'),
	comment  = require('./models/Comment').Comment,
	reply    = require('./models/Comment').Reply,
	course   = require('./models/Course');

module.exports.Video   = mongoose.model('Video', new Schema(video));
module.exports.User    = mongoose.model('User', new Schema(user));
module.exports.Comment = mongoose.model('Comment', new Schema(comment));
module.exports.Reply   = mongoose.model('Reply', new Schema(reply));
module.exports.Course  = mongoose.model('Course',new Schema(course));