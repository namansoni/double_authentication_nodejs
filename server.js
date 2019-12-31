const express = require('express');
const mongoose = require('mongoose');
const constants = require('./constants');
const bodyParser = require('body-parser');
const authController = require('./controller/authController.js');
// const userController = require('./controller/userController.js');
// const {checkToken} = require('./middleware');

//for express
const app = express();
app.use(bodyParser.json());
mongoose.connect(constants.DB_URI,{useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.urlencoded({extended : false}))

//for frontend 
app.get('/login', (req,res) => {
    res.sendfile('./public/login.html');
});

app.get('/register', (req,res) => {
    res.sendfile('./public/register.html');
});

app.get('/transaction', (req,res) => {
    res.sendfile('./public/transaction.html');
});
//

app.post('/register', authController.register);
app.post('/login', authController.login);
// app.get('/users/:id',checkToken, userController.getUser);
app.post('/transaction', authController.transact);

app.listen(constants.PORT, () => {
    console.log(`server is listening on: ${constants.PORT}`)
});