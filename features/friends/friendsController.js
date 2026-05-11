import { service } from "./friendsService.js";
/*
[]frndController
    []getUserFrndReqs
    []getUserFrndList
    []sendFrndReq
    []AcceptFrndReqById
    []rejectFrndReqById
    []removeFrndFromList

*/
const friendsList = async (req, res) =>{
    try {
        //takes id
        const friends = await service.getActiveFriends(req.user.id)
        res.status(200).json(friends)
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }
}
const pendingFriends = async (req, res)=>{
    try {
        //takes id
        const pendingRequests = await service.getPendingFriends(req.user.id)
        res.status(200).json(pendingRequests)
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }    
}
const acceptFriendRequest = async (req, res) =>{
    try {
        //expects a friend req.recordId
        const result = await service.acceptFriendRequest(req.body.recordId)
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    } 
}

const controller = {
    friendsList,
    pendingFriends,
    acceptFriendRequest
}

export{
    controller
}