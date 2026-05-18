import { body,param } from 'express-validator';



const friendId = [
    param('id').trim().notEmpty().withMessage('friend id must be defined')
        .isInt().toInt().withMessage('friend id must be an integer')
]
/*senderId, recieverId*/
const friendReq = [
    body('senderId').trim().notEmpty().withMessage('sender id must be defined')
        .isInt().toInt().withMessage('sender id must be an integer'),
    body('recieverId').trim().notEmpty().withMessage('reciever id must be defined')
        .isInt().toInt().withMessage('reciever id must be an integer')
]
const reqId = [
        body('requestId').trim().notEmpty().withMessage('request id must be defined')
        .isInt().toInt().withMessage('request id must be an integer')
]
const validate ={
    friendId,
    friendReq,
    reqId
}

export{
    validate
}