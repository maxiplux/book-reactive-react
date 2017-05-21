var Profile = require('../models/Profile')
var authService = require('../services/AuthService')
var bcrypt = require('bcrypt')
var base64Img = require('base64-img');
var jwt = require('jsonwebtoken');
var configuration = require('../../config')

function signup(req, res, err){
  const newProfile = new Profile({
    name: req.body.name,
    userName: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  })

  newProfile.save(function(err){
    if(err){

      let errorMessage = null
      if(err.errors!=null && err.errors.userName != null){
        errorMessage = "Nombre de usuario existente"
      }else{
        errorMessage = 'Error al guardar el usuario'
      }
      res.send({
        ok:false,
        message:"Error al crear el usuario",
        error: errorMessage
      })
    }else{
      let token = authService.generateToken({
        id: newProfile._id,
        username: req.body.username
      })
      res.send({
        ok: true,
        body: {
          profile: newProfile,
          token: token
        }
      })
    }
  })
}

function usernameValidate(req, res, err){
  Profile.find({'userName': req.params.username},function(error, profiles){
    if (profiles.length > 0) {
      res.send({
        ok: false,
        message: "Usuario existente"
      })
    }else{
      res.send({
        ok: true,
        message: "Usuario disponible"
      })
    }
  })
}

function login(req, res, err){

  Profile.findOne({userName: req.body.username}, function (error, profile){
    if(profile==null){
      res.send({
        ok:false,
        message: "Usuario y contraseña inválida"
      })
    }

    bcrypt.compare(req.body.password, profile.password,
        function(err, valid) {
          if (!valid) {
           return res.send({
                   ok: false,
                   message: 'Usuario y password inválidos'
             });
          }

        let user = {
          username: req.body.username,
          id: profile._id
        }

        let token = authService.generateToken(user)


        res.send({
          ok:true,
          profile: {
            id: profile.id,
            name: profile.name,
            userName: profile.userName,
            avatar: profile.avatar || base64Img.base64Sync('./public/resources/avatars/0.png'),
            banner: profile.banner || base64Img.base64Sync('./public/resources/banners/4.png'),
            tweetCount: profile.tweetCount,
            following: profile.following,
            followers: profile.followers
          },
          token: token
         });
       });
  })
}

function relogin(req,res, err){
  let userToken = {
    id: req.user.id,
    username: req.user.username
  }
  let newToken = authService.generateToken(userToken)

  Profile.findOne({_id: req.user.id}, function( err, profile){
    if(err){
      res.send({
        ok: false,
        message: "Error al consultar el usuario",
        error: err
      })
    }else{
      res.send({
        ok:true,
        profile: {
          id: profile._id,
          name: profile.name,
          userName: profile.userName,
          avatar: profile.avatar || base64Img.base64Sync('./public/resources/avatars/0.png'),
          banner: profile.banner || base64Img.base64Sync('./public/resources/banners/4.png'),
          tweetCount: profile.tweetCount,
          following: profile.following,
          followers: profile.followers
        },
        token: newToken
       });
    }
  })
}

function getProfileByUsername(req, res, err){
  let user = req.params.user
  if(user === null){
    res.send({
      ok:false,
      message: "parametro 'user' requerido"
    })
  }

  Profile.findOne({userName: user}, function(err, user){
    if(err){
      res.send({
        ok: false,
        message: "Error al obtener los datos del usuario",
        error: err
      })
      return
    }
    if(user === null){
      res.send({
        ok: false,
        message: "Usuario no existe"
      })
      return
    }

    var token = req.headers['authorization'] || ''
    token = token.replace('Bearer ', '')
    jwt.verify(token, configuration.jwt.secret, function(err, usertToken) {
      let follow = null
      if (!err) {
        follow = user.followersRef.find(x => x.toString() === usertToken.id.toString()) != null
      }

      res.send({
        ok:true,
        body: {
          _id: user._id,
          name: user.name,
          description: user.description,
          userName: user.userName,
          avatar: user.avatar || base64Img.base64Sync('./public/resources/avatars/0.png'),
          banner: user.banner || base64Img.base64Sync('./public/resources/banners/4.png'),
          tweetCount: user.tweetCount,
          following: user.following,
          followers: user.followers,
          follow: follow
        }
      })
    })
  })
}


function updateProfile(req, res, err){
  let username = req.user.username
  const updates = {
    name: req.body.name,
    description: req.body.description,
    avatar: req.body.avatar,
    banner: req.body.banner
  }

  Profile.update({ userName: username }, updates, function(err,user){
    if(err){
      res.send({
        ok: false,
        message: "Error al actualizar el perfil",
        error: err
      })
    }else{
      res.send({
        ok: true
      })
    }
  })
}

function getSuffestedUser(req, res, err){
  let user = req.user

  Profile.find({userName: {$ne: user.username}}).sort({"date": -1}).limit(3).exec(function(err, users){
    if(err){
      res.send({
        ok: false,
        message: err.message,
        error: err
      })
    }else{
      let response = users.map(x => {
        return {
          _id: x._id,
          name: x.name,
          description: x.description,
          userName: x.userName,
          avatar: x.avatar || base64Img.base64Sync('./public/resources/avatars/0.png'),
          banner: x.banner || base64Img.base64Sync('./public/resources/banners/4.png'),
          tweetCount: x.tweetCount,
          following: x.following,
          followers: x.followers
        }
      })
      res.send({
        ok: true,
        body: response
      })
    }
  })
}

function follow(req, res, err){
  let username = req.user.username
  let followingUser = req.body.followingUser

  Profile.findOne({userName: username}, function(err, myUser){
    if(err){
      res.send({
        ok: false,
        message: "Error al consultar tu usuario",
        error: err
      })
    }else{
      Profile.findOne({userName: followingUser}, function(err, otherUser){
        let unfollow = myUser.followingRef.find(x => x.toString() === otherUser._id.toString()) != null
        if(unfollow){
          myUser.followingRef.pop(otherUser._id)
          myUser.following += -1
        }else{
          myUser.followingRef.unshift(otherUser._id)
          myUser.following += 1
        }

        myUser.save(function(err){
          if(err){
            res.send({
              ok: false,
              message: "Error al guardar los cambios",
              error: err
            })
          }else{
            if(unfollow){
              otherUser.followersRef.pop(myUser._id)
              otherUser.followers += -1
            }else{
              otherUser.followersRef.unshift(myUser._id)
              otherUser.followers += 1
            }

            otherUser.save(function(err){
              if(err){
                res.send({
                  ok: false,
                  message: "Error al guardar los cambios",
                  error: err
                })
              }else{
                res.send({
                  ok: true,
                  unfollow: unfollow,
                  body: myUser
                })
              }
            })
          }
        })
      })
    }
  })
}

function getFollower(req, res, err){
    let username = req.params.user
    Profile.findOne({userName : username}).populate("followersRef").exec(function(err, followers){
      if(err){
        res.send({
          ok:false,
          message: "Error al consultara los seguidores",
          error: err
        })
      }else{
        if(followers === null){
          res.send({
            ok: false,
            message: "No existe el usuario"
          })
        }else{
          let response = followers.followersRef.map( x => {
            return {
              _id: x._id,
              userName: x.userName,
              name: x.name,
              description: x.description,
              avatar: x.avatar || base64Img.base64Sync('./public/resources/avatars/0.png'),
              banner: x.banner || base64Img.base64Sync('./public/resources/banners/4.png')
            }
          })

          res.send({
            ok: true,
            body: response
          })
        }
      }
    })
}

function getFollowing(req, res, err){
  let username = req.params.user
  Profile.findOne({userName : username}).populate("followingRef").exec(function(err, followings){
    if(err){
      res.send({
        ok:false,
        message: "Error al consultara los seguidores",
        error: err
      })
    }else{
      if(followings === null){
        res.send({
          ok: false,
          message: "No existe el usuario"
        })
      }else{
        let response = followings.followingRef.map( x => {
          return {
            _id: x._id,
            userName: x.userName,
            name: x.name,
            description: x.description,
            avatar: x.avatar || base64Img.base64Sync('./public/resources/avatars/0.png'),
            banner: x.banner || base64Img.base64Sync('./public/resources/banners/4.png')
          }
        })

        res.send({
          ok: true,
          body: response
        })
      }
    }
  })
}

module.exports = {
  signup,
  usernameValidate,
  login,
  getProfileByUsername,
  updateProfile,
  getSuffestedUser,
  follow,
  getFollower,
  getFollowing,
  relogin
}
