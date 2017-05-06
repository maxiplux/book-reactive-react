var mongoose = require('mongoose')
var Schema = mongoose.Schema
var Profile = require('./Profile')
var Tweet = require('./Tweet')

var reply = Schema({
  _creator: {type: Schema.Types.ObjectId, ref: 'Profile'},
  tweetParent: {type: Schema.Types.ObjectId, ref: 'Tweet'},
  date: {type: Date, default: Date.now},
  message: String,
  image : {type: String},
  likeCounter: {type: Number, default: 0}
})

var Reply = mongoose.model('Reply', reply);

module.exports= Reply
