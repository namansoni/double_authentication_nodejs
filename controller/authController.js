var {userModel,list1Model, list2Model, validate} = require('../models/user.js');
var nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
module.exports = {
    async register(req,res){
        console.log(req.body);
        let {corpid, name, email ,position,  password, forlist1, forlist2} = req.body;
        //TODO: validate req.body
        const { error } = validate(req.body);
        console.log("after validation");
        if(error){
            console.log('error is working')
            res.status(400);
            res.send(error.details[0].message);
            return;
        }
        // let ifpresent = userModel.findOne({email:req.body.email});
        // if(ifpresent){
        //     console.log('This User exists already');
        //     res.status(400);
        //     res.send('This User exists already');
        //     return;
        // }
        
        let user = new userModel({corpid, name, email ,position,  password, forlist1, forlist2});
        user.password = await bcrypt.hash(user.password, 10);
        user.save( (err,result) => {
            if(err){
                res.status(500);
                res.send();
                return;
            }
            console.log('user should have been saved');
        if (req.body.forlist1 === "on" && req.body.forlist2 !== "on"){
            let list1 = new list1Model({corpid, name, email ,position,  password, forlist1, forlist2});
            list1.password = user.password;
            list1.save( (err,result) => {
                if(err){
                    res.status(500);
                    res.send();
                    return;
                }
                console.log('user should have been saved in list1');
            });  
        }
                let list2 = new list2Model({corpid, name, email ,position,  password, forlist1, forlist2});
                if (req.body.forlist2 === "on"){
                    list2.password = user.password;
                    list2.save( (err,result) => {
                        if(err){
                            res.status(500);
                            res.send();
                            return;
                        }
                        console.log('user should have been saved in list2');
                    })
                }
                res.redirect('/login');    
        })
    },
    async login(req,res){
        console.log(req.body);
        let {corpid , password} = req.body;
        userModel.findOne({corpid}, async (err,result) => {
            console.log(result);
            const validPassword = await bcrypt.compare(req.body.password,result.password);
            if (!validPassword) {
                return res.status(400).send('Incorrect corpid or password.');
            }        
            if(err){
                res.status(500);
                res.send();
                return;
            }
            if(!result){
                res.status(401);
                res.send({"error" : "unauthorised"});
                return;
            }
            console.log(result);
            // res.send({jwt:result.generateJwtToken(result._id)});
            res.redirect('/transaction');
        });
    },
    async transact(req,res){
        console.log(req.body);
        //bulk mail user
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'pandeyaman0702@gmail.com',
              pass: 'Abhijeet1!'
            }
        });
        //
        //we need to send mail to list 1 irrespectively.
        list1Model.find({}, (err, docs) => {

            console.log(docs);
            docs.forEach((doc) => {
                    console.log(doc);

                const mailOptions = {
                    from: 'pandeyaman0702@gmail.com', // sender address
                    to: `${doc.email}`, // list of receivers
                    subject: ' Urgent Payment Notice', // Subject line
                    html: `<p>Employee of Corporate ID : ${req.body.corpid}</p>
                     <p>Name : ${req.body.name}</p>
                     <p>Amount to be debited  (in Rs.)${req.body.amount}</p>
                     <p>Purpose : ${req.body.purpose}</p>
                     <p>Required Account No. : ${req.body.accid}</p> 
                     <p>Click the link if you want to allow <a href="http://www.google.com">http://www.google.com</a></p>
                     <p>If you want to allow <a href="http://yahoo.com">http://yahoo.com</a></p>`// plain text body
                  }
                  transporter.sendMail(mailOptions, function (err, info) {
                    if (err)
                      console.log(err)
                    else
                      console.log(info);
                  });
    
            });
        }); 

        if (req.body.amount < 50000) {
            
        }

        else if (req.body.amount >= 50000 && req.body.amount < 200000){
        }
        else if(req.body.amount >= 200000){
            //we need to send list3 too
        }
        res.send('');
    }




}