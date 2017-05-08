var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence');
var Tweet = require('./Tweet')

var profile = new Schema({
  name: {type: String},
  userName: {type: String, unique: true, index: true, uniqueCaseInsensitive: true},
  password: String,
  description: {type: String, default: 'Nuevo en Twitter'},
  avatar: {type: String, default: null},
  banner: {type: String, default: null},
  tweetCount: {type: Number, default: 0},
  following: {type: Number, default: 0},
  followers: {type: Number, default: 0},
  date: {type: Date, default: Date.now},
  Tweets: [{type: Schema.Types.ObjectId, ref: mongoose.model('Tweet').schema}]
});
// profile.plugin(AutoIncrement, {inc_field: '_id'});
profile.plugin(uniqueValidator, { message: 'El {PATH} to be unique.' });

var Profile  = mongoose.model('Profile', profile);

module.exports= Profile
