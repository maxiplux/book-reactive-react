var express = require('express');
var router = express.Router();
var  userController = require('../api/controllers/UserController')
var configuration = require('../config')
var tweetController = require('../api/controllers/TweetController')
var jwt = require('jsonwebtoken');

router.use('/secure',function(req, res, next) {
  var token = req.headers['authorization']
  if (!token) {
    res.status(401).send({
      ok: false,
      message: 'Toket inválido'
    })
  }

  token = token.replace('Bearer ', '')

  jwt.verify(token, configuration.jwt.secret, function(err, user) {
    if (err) {
      return res.status(401).send({
        ok: false,
        message: 'Toket de inválido'
      });
    } else {
      req.user = user
      next()
    }
  });
});


router.post('/login', userController.login)
router.post('/signup', userController.signup)
router.post('/secure/follow', userController.follow)
router.post('/secure/like', tweetController.like)
router.post('/secure/tweet', tweetController.addTweet)

router.put('/secure/profile', userController.updateProfile)

router.get('/tweets',tweetController.getNewTweets)
router.get('/tweetDetails/:tweet', tweetController.getTweetDetails )
router.get('/tweets/:user', tweetController.getUserTweets)
router.get('/profile/:user',userController.getProfileByUsername)
router.get('/usernameValidate/:username', userController.usernameValidate)
router.get('/secure/suggestedUsers',userController.getSuffestedUser)
router.get('/secure/followers',userController.getFollower)
router.get('/secure/followings',userController.getFollowing)
router.get('/secure/relogin',userController.relogin)

module.exports = router;
