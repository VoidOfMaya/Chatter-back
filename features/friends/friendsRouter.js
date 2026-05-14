import { Router } from "express";
import { controller } from "./friendsController.js";
import { pipe } from '../routerController.js'
import { channelRouter } from "../channel/channelRouter.js";

const friendRouter = Router();

friendRouter.get('/', controller.getActiveFriends)
friendRouter.get('/:id', controller.getFriendConnectionbyId)
friendRouter.get('/requests', controller.pendingFriends)
friendRouter.post('/send-request',controller.requestFriend)
friendRouter.put('/accept-request', controller.acceptFriendRequest)
friendRouter.delete('/reject-request', controller.rejectFriendRequest)
friendRouter.delete('/',controller.endFriendship)

//nested Dm channel router:-
friendRouter.use('/:connectionId/dm', channelRouter);


export{
    friendRouter
}