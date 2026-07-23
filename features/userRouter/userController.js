import { service } from "./userServices.js"
import { validationResult, matchedData } from "express-validator"
import { cloudUpload } from "../photos/cloudinary.js"

//gets  friends& channels
const getDashboard = async (req, res)=>{
    try {
        //takes req.user.id to get dashboard
        const data = await service.populateDashboard(req.user.id)
        res.status(200).json(data)
    } catch (err) {
        console.error({
            message: err.message,
            method: req.method,
            path: req.originalUrl,
            stack: err.stack,
        });
      res.status(500).json({msg: err.message || 'internal server error'})  
    }
    
}
//gets current users profile
const getCurrentUser = async (req, res)=>{
    //takes user id from req.user
    try {
        const currentUser = await service.getUser(req.user.id)
        res.status(200).json(currentUser)
    } catch (err) {
        console.error({
            message: err.message,
            method: req.method,
            path: req.originalUrl,
            stack: err.stack,
        });
        res.status(500).json({msg: err.message || 'internal server error'})  
    }
}
// edits and updates current user info
const editCurrentUser = async (req, res)=>{
    //validation handler
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req);  
    try {
        //upload to cloudinary
        const photo = await cloudUpload(req.file.buffer);
        //checks if cloudinary  returned the correct objects
        if(!photo.secure_url){ 
            throw new Error('errors','internal Error: cloudinary url faulty, try again later!' )
        }
        const result = await service.editCurrentUser(req.user.id,data, photo.secure_url)
        res.status(200).json({
            name:result.name,
            bio:result.bio,
            photo:result.photo
        })
    } catch (err) {
        console.error({
            message: err.message,
            method: req.method,
            path: req.originalUrl,
            stack: err.stack,
        });
        res.status(500).json({msg: err.message || 'internal server error'})      
    }
    
}
//gets other user profile by id!
const viewUserProfile = async (req, res)=>{
    //validation handler
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const data = matchedData(req);  

    //takes user id from  params
    try {
        const currentUser = await service.getUser(data.id)
        res.status(200).json(currentUser)
    } catch (err) {
        console.error({
            message: err.message,
            method: req.method,
            path: req.originalUrl,
            stack: err.stack,
        });
        res.status(500).json({msg: err.message || 'internal server error'})  
    }
}
//blockes user {if friends: true}
const blockUser = async (req, res)=>{
    res.status(200).json({msg: 'block user if friend'})
}

const controller ={
    getDashboard,
    getCurrentUser,
    editCurrentUser,
    viewUserProfile,
    blockUser
}
export{controller}