const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const constants = require('../constants');
const Joi = require('joi');

// async 
function validate(user) {
    const schema = {
        corpid:Joi.string().min(3).max(255).required(),
        name:Joi.string().min(3).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        position:Joi.string().min(3).max(255).required(),
        password: Joi.string().min(3).max(255).required(),
        forlist1: Joi.string().min(2),
        forlist2: Joi.string().min(2)
    };
    // let {email, password} = body;
    // password = await bcrypt.hash(password, 10);
    // return {err: Joi.validate(body, schema), 
    //     user: UserModel({name, email, password, age})
    // };
    return Joi.validate(user,schema);
}

const user = mongoose.Schema({
    "corpid" : String,
    "name" : String,
    "email" : String,
    "position" : String,
    "password" : String,
    "forlist1" : String,
    "forlist2" : String
});

user.methods.generateJwtToken = (_id) => {
    const token = jwt.sign(
        {_id: _id},
        constants.JWT_SECRET,
        {expiresIn: "2 days"}
    );
    return token;
}

const userModel = mongoose.model('user', user);
const list1Model = mongoose.model('list1', user);
const list2Model = mongoose.model('list2', user);
module.exports = {userModel, list1Model, list2Model, validate};