require('dotenv').config();
const express= require('express');
const app= require('express');
const path= require('path');
const bodyParser = require('body-parser');

const axios= required ('axios)')
const mongoose=  require('mongoose');
const session = require('express-session');
const { response } = require('express');
const url = "mongodb://localhost:27017/mydb";
const mysql= require('mysql');

app.use(cors());

//middleware
app.use(bodyParser.urlencoded({extended: 'true'}));

//adding route
const router = require('./routes/router.js');
app.use('/api', router);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.RANDOM_SECRET_WORD,
    resave: true,
    saveUninitialized: false
}));

app.use(bodyParser.json());

app.get('/', ()=>{
  res.json('The connection has been gotten')
})

  //listening on port to the server 
  const port= process.env.PORT||3000;
  app.listen(port, (req, res)=>{
      console.log(`listening to the server at ${port}...`)
  })
  