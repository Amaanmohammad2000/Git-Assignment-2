require("dotenv").config();
const Post = require("../models/post");
const controller = {};

controller.get = async (req, res)=>{
    try{
        let posts = await Post.find();
        res.status(200).json({status: "Success", result: posts});
    } 
    catch(error){
        res.status(400).json({status: "Failed", message: error.message});
    }
}

controller.post = async (req,res)=>{
    try {
        let newPost = await new Post({
            ...req.body,
            user: req.loginUser.userId
        })
        newPost = await newPost.save();
        res.status(200).json({status: "Success", result: newPost});
    } 
    catch(error){
        res.status(400).json({status: "Failed", result: error.message});
    }
}

controller.put = async (req,res)=>{
    try {
        let oldUser = await Post.findById(req.params.id);
        if(!oldUser){
            res.status(400).json({status : "Failed", message : "Invalid ID!"})
        }
        if(oldUser.user == req.loginUser.userId){
            let updated = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
            res.status(200).json({status: "Success", result: updated});
        }
        else{
            res.status(401).json({status : "Failed", message : "User Unauthorized"});
        }
        
    } 
    catch(error){
        res.status(400).json({status : "Failed", message : error.message});
    }
}

controller.delete = async (req,res)=>{
    try {
        let oldUser = await Post.findById(req.params.id);
        if(!oldUser){
            res.status(400).json({status : "Failed", message : "Invalid ID!"})
        }
        if(oldUser.user == req.loginUser.userId){
            await Post.findByIdAndDelete(req.params.id);
            res.status(200).json({status: "Succesfully deleted"});
        }
        else{
            res.status(401).json({status : "Failed", message : "User Unauthorized"});
        }
        
    } 
    catch(error){
        res.status(400).json({status : "Failed", message : error.message});
    }
}

module.exports = controller;