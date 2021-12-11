const express= require('express');
const router= express.Router();

const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');
const uuid= require('uuid');

//A reference to calling the user.js directory that happens to be the middleware
const db = require('../lib/db.js');
const userMiddleware = require('../middleware/users.js');

//router for sign-up
router.post('/sign-up', userMiddleware.validateRegister, (req, res, next)=>{
  db.query(
    `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(
      req.body.username
    )}`);
    (err, result)=>{
      if (result.length){
        return res.status(409).send({
          message: 'The userName is already in use!'
        });
      }
else{
  return res.send({message: 'UserName is available'})
}
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO users (id, username, password, registered) VALUES ('${uuid.v4()}', ${db.escape(
                req.body.username
              )}, ${db.escape(hash)}, now())`,
              
              (error, result)=>{
            
              if (err) {
                throw err;
                return res.status(400).send({
                  msg: err
                });
              }
              return res.status(201).send({
                msg: 'Registered!'
              });
            }
          );
        }
      });
    }
  }
)

//router for login
router.post('login', (req, res, next)=>{
  db.query(
    `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
    (error, result)=>{
      if(error){
        throw error
        return res.status(490).send({message: error})
      }
    }
  )

  if(result.length){
    return res.status(500).send({message: 'userName is incorrect!'})
  }
})

// check password to compare with the one in the database
bcrypt.compare(
  req.body.password,
  result[0]['password'],
  (bErr, bResult) => {
   
    //wrong password
    if (bErr) {
      throw bErr;
      return res.status(401).send({
        msg: 'Username or password is incorrect!'
      });
    }
    //pass variables that we want to “store” in the JWT token
    if (bResult) {
      const token = jwt.sign({
          username: result[0].username,
          userId: result[0].id
        },

        //pass a key with which the JWT token is generated
        'SECRETKEY', {
          expiresIn: '1h' //length of the validity of the token
        }
      );
      db.query(
        `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
      );
      return res.status(200).send({
        msg: 'Logged in!',
        token,
        user: result[0]
      });
    }
    return res.status(401).send({
      msg: 'Username or password is incorrect!'
    });
  }
);

router.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  res.send('This is the secret content. Only logged in users can see that!');
});


module.export= router;


