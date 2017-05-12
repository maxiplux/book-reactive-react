var Profile = require('../models/Profile')
var Tweet = require('../models/Tweet')
var base64Img = require('base64-img')
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function addTweet(req, res, err){

  let user = req.user

  Profile.findOne({_id: user.id}, function(err, queryUser){

    if(err != null){
      res.send({
        ok: false,
        message: "Error al consultar el usuario",
        error: err
      })
    }else if(queryUser == null){
      res.send({
        ok: false,
        message: "No se encontro el usuario"
      })
    }

    const newTweet = new Tweet({
        _creator: user.id,
        tweetParent: req.body.tweetParent,
        message: req.body.message,
        image: req.body.image
    })

    if(req.body.tweetParent){// Reply
      Tweet.findOne({_id: req.body.tweetParent},function(err,tweet){
        if(err || tweet == null){
          res.send({
            ok: false,
            message: "No existe el tweet padre",
            error: err
          })
        }
        newTweet.save(function(err, createTweet){
          if(err){
            console.log(err);
            res.send({
              ok:false,
              message: "Error al guardar el Tweet",
              error: err.message
            })
          }else{
            tweet.replys = tweet.replys+1
            tweet.save(function(err, tweetUpdate){
              if(err){
                res.send({
                  ok: false,
                  message: "Error al actualziar el Tweet",
                  error: err
                })
              }else{
                res.send({
                  ok: true,
                  tweet: createTweet
                })
              }
            })
          }
        })
      })
    }else{ //New Tweet
      newTweet.save(function(err, createTweet){
        if(err){
          console.log(err);
          res.send({
            ok:false,
            message: "Error al guardar el Tweet",
            error: err.message
          })
        }else{
          queryUser.tweetCount = queryUser.tweetCount+1
          queryUser.save(function(err){
            if(err){
              console.log(err);
              res.send({
                ok: false,
                message: "Error al actualizar el usuario",
                error: err
              })
            }
          })
          res.send({
            ok: true,
            tweet: createTweet
          })
        }
      })
    }


  })
}

function getNewTweets(req, res, err){
  Tweet.find({tweetParent : null}).populate("_creator").sort('-date').exec(function(err, tweets){
      if(err){
        res.send({
          ok: false,
          message: "Error al cargar los Tweets",
          error: err
        })
        return
      }

      let response = tweets.map( x => {
        return{
          _id: x._id,
          _creator: {
            _id: x._creator._id,
            name: x._creator.name,
            userName: x._creator.userName,
            avatar: x._creator.avatar || base64Img.base64Sync('./public/resources/avatars/0.png')
          },
          date: x.date,
          message: x.message,
          liked: false,
          likeCounter: x.likeCounter,
          replys: x.replys,
          image: x.image
        }
      })

      res.send({
        ok: true,
        body: response
      })
  })
}

function getUserTweets(req, res, err){
  let username = req.params.user

  Profile.findOne({userName: username}, function(err, user){
    if(err){
      res.send({
        ok: false,
        message: "Error al consultar los tweets",
        error: err
      })
      return
    }

    if(user == null){
      res.send({
        ok: false,
        message: "No existe el usuarios"
      })
      return
    }

    Tweet.find({_creator: user._id,tweetParent : null}).populate("_creator").sort('-date').exec(function(err, tweets){
        if(err){
          res.send({
            ok: false,
            message: "Error al cargar los Tweets",
            error: err
          })
          return
        }

        let response = tweets.map( x => {
          return{
            _id: x._id,
            _creator: {
              _id: x._creator._id,
              name: x._creator.name,
              userName: x._creator.userName,
              avatar: x._creator.avatar || base64Img.base64Sync('./public/resources/avatars/0.png')
            },
            date: x.date,
            message: x.message,
            liked: false,
            likeCounter: x.likeCounter,
            replys: x.replys,
            image: x.image
          }
        })

        res.send({
          ok: true,
          body: response
        })
    })


  })



}

function getTweetDetails(req, res, err){
  let tweetId = req.params.tweet
  Tweet.findOne({_id: tweetId})
  .populate("_creator")

  .exec(function(err, tweet){
    if(err){
      res.send({
        ok:false,
        message: "Error al cargar el Tweet",
        error: err
      })
    }else if(tweet == null){
      res.send({
        ok: false,
        message: "No existe el Tweet"
      })
    }

    Tweet.find({tweetParent: mongoose.Types.ObjectId(tweetId)})
    .populate("_creator")
    .sort('-date')
    .exec(function(err, tweets){

      if(err){
        res.send({
          ok:false,
          message:"Error al consultar el detalle",
          error: err
        })
      }


      let replys = []
      if(tweets != null && tweets.length > 0){
        replys = tweets.map(x => {
          return {
            _id: x._id,
            _creator: {
              _id: x._creator._id,
              name: x._creator.name,
              userName:x._creator.userName,
              avatar: x._creator.avatar || base64Img.base64Sync('./public/resources/avatars/0.png')
            },
            date: x.date,
            message: x.message,
            liked: false,
            likeCounter: x.likeCounter,
            replys: x.replys,
            image: x.image,

          }
        })
      }
      res.send({
        ok: true,
        body: {
          _id: tweet._id,
          _creator: {
            _id: tweet._creator._id,
            name: tweet._creator.name,
            userName:tweet._creator.userName,
            avatar: tweet._creator.avatar || base64Img.base64Sync('./public/resources/avatars/0.png')
          },
          date: tweet.date,
          message: tweet.message,
          liked: false,
          likeCounter: tweet.likeCounter,
          image: tweet.image,
          replys: tweet.replys,
          replysTweets: replys
        }
      })
    })

  })
}

function like(req, res, err){
  let user = req.user

  Tweet.findOne({_id: req.body.tweetID},function(err, tweet){
      tweet.likeCounter = tweet.likeCounter + (req.body.like ? 1 : -1)
      tweet.save(function(err, tweetUpdate){
        if(err){
          res.send({
            ok: false,
            message: "Error al actualizar el Tweet",
            error: err
          })
        }else{
          res.send({
            ok: true,
            body: tweetUpdate
          })
        }
      })
  })

}



module.exports={
  like,
  addTweet,
  getNewTweets,
  getTweetDetails,
  getUserTweets
}
