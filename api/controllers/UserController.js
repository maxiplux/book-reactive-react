var Profile = require('../models/Profile')
var authService = require('../services/AuthService')
var bcrypt = require('bcrypt')
var base64Img = require('base64-img');

function signup(req, res, err){
  console.log("signup ==>");

  const newProfile = new Profile({
    name: req.body.name,
    userName: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10)
  })

  newProfile.save(function(err){
    console.log(err);
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
            userName: profile.userName
          },
          token: token
         });
       });
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
        followers: user.followers
      }
    })
  })

  // {
  //   "_id"     : "1",
  //   "name"    : "Juan Manuel",
  //   "userName"     : "jmanuel",
  //   "description": "Amante del diseño gráfico y el desarrollo de páginas web, me gusta la lectura y el football.",
  //   "avatar": "/resources/avatars/1.jpg",
  //   "banner": "/resources/banners/1.jpg"
  // }
}


module.exports = {
  signup,
  usernameValidate,
  login,
  getProfileByUsername
}
