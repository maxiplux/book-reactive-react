var express = require('express')
var router = express.Router()
var userController = require('../api/controllers/UserController')
var configuration = require('../config')
var tweetController = require('../api/controllers/TweetController')
var jwt = require('jsonwebtoken')
var path = require('path')
const pug = require('pug');
const methodCatalog = require('../public/apidoc/meta/catalog.js')


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
        message: 'Toket inválido'
      });
    } else {
      req.user = user
      next()
    }
  });
});

//API Documentation

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/apidoc/api-index.html'));
});

router.get('/catalog', function(req, res){
  const meta = require('../public/apidoc/meta/catalog.js')
  res.send(pug.renderFile(__dirname + '/../public/apidoc/api-catalog.pug', meta))
})

router.get('/catalog/:method', function(req, res){
  let method = req.params.method
  const index = methodCatalog.services.map(x => {return x.apiURLPage}).indexOf('/catalog/'+req.params.method)
  if(index === -1){
    res.sendFile(path.join(__dirname + '/../public/apidoc/api-index.html'));
  }else{
    const meta = methodCatalog.services[index]
    res.send(pug.renderFile(__dirname + '/../public/apidoc/api-method.pug', meta))
  }
})

//Private access services (Security)
router.post('/login', userController.login)
router.post('/signup', userController.signup)
router.post('/secure/follow', userController.follow)
router.post('/secure/like', tweetController.like)
router.post('/secure/tweet', tweetController.addTweet)
router.put('/secure/profile', userController.updateProfile)

//Public access services
router.get('/tweets',tweetController.getNewTweets)
router.get('/tweetDetails/:tweet', tweetController.getTweetDetails )
router.get('/tweets/:user', tweetController.getUserTweets)
router.get('/profile/:user',userController.getProfileByUsername)
router.get('/usernameValidate/:username', userController.usernameValidate)
router.get('/secure/suggestedUsers',userController.getSuffestedUser)
router.get('/followers/:user',userController.getFollower)
router.get('/followings/:user',userController.getFollowing)
router.get('/secure/relogin',userController.relogin)

// router.get('/', function(req, res){
//   res.send("Welcome to API REST")
// })

module.exports = router;
