require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const controller = {};

controller.register = async (req,res)=>{
    let {name, email, password} = req.body;
    let encryptedPassword = await bcrypt.hash(password, 10);
    try{
        let newUser = await new User({
            name: name,
            email: email,
            password: encryptedPassword
        })
        newUser = await newUser.save();
        res.status(200).json({status: "Success", result: newUser});
    } 
    catch(error){
        res.status(400).json({status: "Failed", message: error.message});
    }
}

controller.login = async (req, res) => {
    let {email, password} = req.body;
    try {
        let user = await User.findOne({email : email});
        if(user) {
            if(await bcrypt.compare(password, user.password)) {
                let jwtToken = await jwt.sign({userName : user.name, userEmail : user.email, userId : user["_id"]}, process.env.SECRET, {expiresIn : 86400});
                res.status(200).json({status : "Success", token : jwtToken});
            } else {
                res.status(401).json({status : "Failed", message : "Password incorrect"});
            }
        } else {
            res.status(401).json({status : "Failed", message : "User not found"});
        }
       
    } catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
}

module.exports = controller;