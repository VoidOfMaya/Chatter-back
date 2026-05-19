import { service } from "./messageService.js";
import { matchedData, validationResult } from "express-validator";


const getChatLog = async (req, res) =>{
    // data validation
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors : errors.array()})
    const {channelId} = matchedData(req); 
    //main logic
    try {
        return res.status(200).json({channelID: channelId})
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }
}

const controller = {
    getChatLog,
}

export{
    controller
}