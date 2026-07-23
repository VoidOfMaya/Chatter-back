import { service } from "./messageService.js";
import { matchedData, validationResult } from "express-validator";
import { cloudUpload } from "../photos/cloudinary.js"; 


const getChatLog = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const {channelId} = matchedData(req); 
    //main logic
    try {
        const chatlog = await service.getChatlog(channelId)
        return res.status(200).json(chatlog)
    } catch (err) {
        console.error({
            message: err.message,
            method: req.method,
            path: req.originalUrl,
            stack: err.stack,
        });
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }
}
const submitMessage = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const {content} = matchedData(req); 

    const {channelId}= req.params //sanetized by channel validations!
    const {id} = req.user //gets current user id

    const responseTo = !typeof req.body.parentId === Number? null : req.body.parentId

    //main logic
    try {
        //upload to cloudinary
        let result = null;
        if(req.file){
            result = await cloudUpload(req.file.buffer);
            //checks if cloudinary  returned the correct objects
            if(!result.secure_url){ 
                throw new Error('errors','internal Error: cloudinary url faulty, try again later!' )
            }            
        }

        //send to database
        await service.createMessage(Number(channelId),id, content, responseTo, result?.secure_url)
        return res.status(200).json({msg: 'message created!'})
    } catch (err) {
        console.error({
            message: err.message,
            method: req.method,
            path: req.originalUrl,
            stack: err.stack,
        });
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }   
}
const editMessage = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const {content, id} = matchedData(req); 
    //main logic
    try {
        await service.editMessage(content, id)
        return res.status(200).json({msg: 'message edit!'})
    } catch (err) {
        console.error({
            message: err.message,
            method: req.method,
            path: req.originalUrl,
            stack: err.stack,
        });
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }     
}
const deleteMessage = async(req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const {id} = matchedData(req); 
    //main logic
    try {
        await service.deleteMessage(id)
        return res.status(200).json({msg: 'message deleted!'})
    } catch (err) {
        console.error({
            message: err.message,
            method: req.method,
            path: req.originalUrl,
            stack: err.stack,
        });
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }   
}
const controller = {
    getChatLog,
    submitMessage,
    editMessage,
    deleteMessage
}

export{
    controller
}