const jwt = require('jsonwebtoken');
const config = require('../config');

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if(!token) {
    return res.json({
      sucess: false,
      message: 'This route requires authentication'
    });
  }
  if(token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  if(token) {
    jwt.verify(token, config.secret, (error, decoded) => {
      if(err) {
        return res.json({
          sucess: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    })
  }
};

module.exports = {
  checkToken: checkToken
};