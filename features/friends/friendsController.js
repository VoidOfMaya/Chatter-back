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
const getActiveFriends = async (req, res) =>{
    try {
        //takes user id  returns lists of connection ids and users
        const friend = await service.getActiveFriends(req.user.id)
        res.status(200).json(friend)
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }
}
const getFriendConnectionbyId = async (req, res) =>{
    try {
        //takes connection id not friend id
        const friends = await service.getFriendConnectionById(req.params.id)
        res.status(200).json(friends)
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }    
}
const requestFriend = async (req, res) =>{
    const {senderId, recieverId}= req.body
    try {
        const request = await service.sendFriendRequest(senderId, recieverId)
        res.status(200).json(request)
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})       
    }
}
const pendingFriends = async (req, res)=>{
    try {
        //takes id\
        const {id} = req.user
        const pendingRequests = await service.getPendingFriends(id)
        res.status(200).json(pendingRequests)
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }    
}
const acceptFriendRequest = async (req, res) =>{
    try {
        //expects a friend req.body.requestId
        const {requestId} = req.body
        const result = await service.acceptFriendRequest(requestId)
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    } 
}
const rejectFriendRequest = async (req, res) =>{
    try {
        //expects a friend req.body.requestId
        const {requestId} = req.body
        const result = await service.rejectFriendRequest(requestId)
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }    
}
const endFriendship = async (ewq, res) =>{
    try {
        //expects a friend req.body.requestId
        const {requestId} = req.body
        const result = await service.rejectFriendRelation(requestId)
        res.status(200).json(result)
    } catch (err) {
        res.status(500).json({msg: err.message || 'Internal Server Error'})
    }      
}

const controller = {
    getActiveFriends,
    getFriendConnectionbyId,
    requestFriend,
    pendingFriends,
    acceptFriendRequest,
    rejectFriendRequest,
    endFriendship
}

export{
    controller
}