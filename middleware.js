// const jwt = require('jsonwebtoken');
// const constants = require('./constants')
// //we just check if there is a header or not
// // 1. get authorization header
// // 2.jwt token validation 
// module.exports = {
//     checkToken(req,res, next){
//         console.log("You arrived in middleware tab");
//         let authHeader = req.header('Authorization');
//         jwt.verify(authHeader, constants.JWT_SECRET, (err,decoded) => {
//             if(err){
//                 res.status(401);
//                 res.send({"error": "unauthorized"});
//                 return;
//             }
//             req.id = decoded._id;
//             console.log("Just before decoded");
//             console.log(decoded._id);
//             console.log(req.params.id);
//             if(req.id && req.id !== req.params.id){
//                 res.status(401);
//                 res.send({"error" : "other user token"});
//                 return;
//             }
//             console.log("The control came here");
//             next();
//         });          
//     }
// }
