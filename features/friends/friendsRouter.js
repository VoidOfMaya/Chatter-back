import { Router } from "express";
import { controller } from "./friendsController.js";

const friendRouter = Router();

friendRouter.get('/', controller.friendsList)
friendRouter.get('/requests', controller.pendingFriends)
friendRouter.put('/request', controller.acceptFriendRequest)

export{
    friendRouter
}