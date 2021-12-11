//Middleware functions to validate the entered data
const jwt= require('jsonwebtoken');

//This module is to be exported to the router directory
module.export= {
    validateRegister:(req, res, next)=>{
        //validate for minimum of 3 character for the userName
        if (!req.body.userName ||req.body.length<3){
return res.status(404).send({
message: 'Please put in a minimum of 3 character'
})
        }
    //Validate for inputing the password
    if(!req.body.password||req.body.length<8){
        return res.status(404).send({
            message: 'The password must have a mimimum of 8 characters'
        })
    }


    //validate for confirming password for more security by repeating inputing password
if(!req.body.password_repeat || req.body.password != req.body.password_repeat){ 
        return res.status(400).send({
          msg: 'Both passwords must match'
        })
    
 }

 //create a new middleware whereby token is taken from the header of the request and verified by JWT
 isLoggedIn: (req, res, next)=>{
try{
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(
      token,
      'SECRETKEY'
    );
    req.userData = decoded;
    //middleware
    next();
  } catch (err) {
    return res.status(401).send({
      msg: 'Your session is not valid!'
    });
}
 }

