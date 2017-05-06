var jwt = require('jsonwebtoken');
var configuration = require('../../config')

function generateToken(user) {
  var u = {
   username: user.username,
   id: user.id
  };
  console.log(u);
  return token = jwt.sign(u, configuration.jwt.secret, {
     expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}
module.exports = {
  generateToken
}
