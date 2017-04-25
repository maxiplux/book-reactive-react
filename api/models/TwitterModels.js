var mongoose = require('mongoose')
var Schema = mongoose.Schema

var profile = Schema({
  _id: Number,
  name: String,
  userName: Number,
  password: String,
  avatar: String,
  banner: String,
  Tweets: [{type: Number, ref: tweet}]
});

var tweet = Schema({
  _id: Number,
  _creator: {type: Number, ref: "profile"},
  date: {type: Date, default: Date.now},
  message: String,
  replys:[{type: Number, ref: "Reply"}]
})

var reply = Schema({
  _id: Number,
  _creator: {type: Number, ref: 'Profile'},
  tweet: {type: Number, ref: 'Tweet'},
  date: {type: Date, default: Date.now},
  message: String

})

var Profile  = mongoose.model('Profile', profile);
var Tweet = mongoose.model('Tweet', tweet);
var Reply = mongoose.model('Reply', reply);


//http://mongoosejs.com/docs/populate.html
//join http://stackoverflow.com/questions/31480088/join-two-collection-in-mongodb-using-node-js
