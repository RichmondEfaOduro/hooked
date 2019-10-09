let jwt = require('jsonwebtoken');
let config = require('./middlewares/authMiddleware');
const songs = require('./models/Song');
const bodyParser = require('body-parser')

class HandlerGenerator {
  login (res, req) {
    let username = req.body.username;
    let password = req.body.password;
    console.log(req.body);

    let mockedUsername = 'admin';
    let mockedPassword = 'password';

    if(username && password ) {
      if(username === mockedUsername && password === mockedPassword) {
        let token = jwt.sign({usernamne: username}, 
          config.secret, 
          {expiresIn: '24h'
        }
        );
        res.json({
          sucess: true,
          message: 'Authentication sucessful!',
          token: token,
          user: {
            firstName: 'Admin',
            lastName: 'User'
          }
        });
      } else {
        res.status(401).json({
          sucess: false,
          message: 'Incorrect username or password'
        });
      }
    }else {
      res.status(400).json({
        sucess: false,
        message: 'Authentication failed! please check the request'
      })
    }
  } 
  index (req, res) {
    res.json({
      sucess: true,
      message: 'Index page'
    });
  }
  getSongs(req, res) {
    res.json(songs);
  }
}

function main () {
  let express = require('express');
  let app = express();
  let port = process.env.PORT || 5000;
  let cors = require('cors');

  app.use(cors());
  let handlers = new HandlerGenerator();

  app.use(bodyParser.urlencoded({
    exended: true
  }));

  app.use(bodyParser.json());

  app.post('/api/login', handlers.login);
  app.get('/api', middleware.checkToken, handlers.index);
  app.get('/api/songs', middleware.checkToken, handlers.getSongs);


  app.listen(port, (req, res) => {
    console.log(`server listening on port:${port} `)
  })
}

main();
