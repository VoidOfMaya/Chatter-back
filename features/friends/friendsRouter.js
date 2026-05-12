import { Router } from "express";
import { controller } from "./friendsController.js";

const friendRouter = Router();

friendRouter.get('/', controller.getActiveFriends)
friendRouter.get('/:id', controller.getFriendConnectionbyId)
friendRouter.get('/requests', controller.pendingFriends)
friendRouter.post('/send-request',controller.requestFriend)
friendRouter.put('/accept-request', controller.acceptFriendRequest)
//this functions as both reject friend request and remove existing friends
friendRouter.delete('/remove-connection', controller.removeFriendConnection)


export{
    friendRouter
}