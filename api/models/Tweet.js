var mongoose = require('mongoose')
var Schema = mongoose.Schema
//var Profile = require('./Profile')
// var Reply = require('./Reply')

var tweet = Schema({
  _creator: {type: Schema.Types.ObjectId, ref: 'Profile'},
  tweetParent: {type: Schema.Types.ObjectId, ref: 'Tweet'},
  date: {type: Date, default: Date.now},
  message: String,
  likeCounter: {type: Number, default: 0} ,
  image: {type: String},
  replys: {type: Number, default: 0}
})

var Tweet = mongoose.model('Tweet', tweet);

module.exports= Tweet
