import { Router } from "express"

const messsageRouter = Router();
/*
required: routes:-
        []get messages by channelId with { id, 
                                           content , 
                                           createdAt, 
                                           parentId:{content, userId},
                                           userId
                                           } gets both messages and response messages
        [SORTS BY DATE]
        []createMsg(is reply if og msg id provided)
        []editMsg
        []deleteMsg > author and mod only
*/
messsageRouter.get('/', async (req, res) =>{
    res.status(200).json({msg: 'message router accessed '})
})

export{
    messsageRouter
}